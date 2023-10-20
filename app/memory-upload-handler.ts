import { UploadHandler, UploadHandlerPart } from "@remix-run/node";

// https://github.com/remix-run/remix/issues/3409
type FilePart = Omit<UploadHandlerPart, "filename"> & { filename: string };

type MemoryUploadHandlerOptions = {
  accept: (part: FilePart) => boolean;
};

export function createMemoryUploadHandler(opts: MemoryUploadHandlerOptions): UploadHandler {
  const accept = opts.accept || (() => true);
  const textDecoder = new TextDecoder();

  async function getChunks(data: UploadHandlerPart["data"]) {
    const chunks: Uint8Array[] = [];

    let partSize = 0;
    for await (const chunk of data) {
      partSize += chunk.length;
      chunks.push(chunk);
    }

    return { chunks, partSize };
  }

  async function handleFile(part: FilePart) {
    if (!accept(part)) {
      return null;
    }

    const { chunks } = await getChunks(part.data);

    if (chunks == null) {
      return null;
    }

    return new File(chunks, part.filename, { type: part.contentType });
  }

  async function handleString(part: UploadHandlerPart) {
    const { chunks, partSize } = await getChunks(part.data);

    if (!chunks) {
      return null;
    }

    if (partSize === 0) {
      return "";
    }

    const data = new Uint8Array(partSize);

    let pointer = 0;
    for (const chunk of chunks) {
      data.set(chunk, pointer);
      pointer += chunk.length;
    }

    return textDecoder.decode(data);
  }

  return async (part) => {
    if (part.filename) {
      return handleFile({ ...part, filename: part.filename });
    }

    return handleString(part);
  };
}
