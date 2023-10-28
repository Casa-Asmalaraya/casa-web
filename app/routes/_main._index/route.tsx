import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { loaderServer } from "./loader.server";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";
import { useLoading } from "~/components/Loading";
import { useCreateOrb } from "worb";
import { useEffect, useRef } from "react";
import { Configuration } from "~/constants/configuration";
import { UrlUtils } from "~/utils/url-utils";
import Listing from "./Listing";

export const meta: MetaFunction = () => {
  return [{ title: "lokalplace" }];
};

export async function loader(args: LoaderFunctionArgs) {
  return loaderServer(args);
}

export default function Page() {
  const fetcher = useFetcher();
  const loaderData = useLoaderData<DataResponse<InListingDto[]>>();
  const loading = useLoading();

  const data = useCreateOrb(loaderData?.data);
  const page = useRef(1);
  const searchQuery = useCreateOrb<string | undefined>(undefined);

  useEffect(() => {
    if (loaderData.data.length < Configuration.itemPerPage) {
      page.current = -1;
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onEndReached);
      searchQuery.addListener(onSearchQueryChanged);
    }

    return () => {
      searchQuery.removeListener(onSearchQueryChanged);
      window.removeEventListener("scroll", onEndReached);
    };
  }, []);

  useEffect(() => {
    if (fetcher.state === "loading") {
      loading.showLoading();
    }

    if (fetcher.state === "idle") {
      loading.hideLoading();
    }
  }, [fetcher.state]);

  useEffect(() => {
    const fetcherData = fetcher.data as unknown as DataResponse<any>;
    if (!fetcherData || fetcher.state !== "idle") {
      return;
    }

    if (fetcherData.method !== "GET") {
      return;
    }

    const newData = fetcherData.data as InListingDto[];
    if (newData.length < Configuration.itemPerPage) {
      page.current = -1;
    } else {
      page.current++;
    }

    data.value = [...data.value, ...newData];
  }, [fetcher.data, fetcher.state]);

  function onSearchQueryChanged() {
    data.value = [];
    page.current = 1;

    fetchData();
  }

  function onEndReached() {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollDifference = Math.floor(window.innerHeight + window.scrollY);
    const scrollEnded = documentHeight == scrollDifference;

    if (!scrollEnded || page.current === -1 || fetcher.state !== "idle") {
      return;
    }

    page.current++;
    fetchData();
  }

  function fetchData() {
    if (page.current === -1) {
      return;
    }

    const searchParams = [`page=${page.current}`];
    if (searchQuery.value) {
      searchParams.push(`search=${searchQuery.value}`);
    }

    fetcher.load(UrlUtils.generateUrl(null, { searchParams }));
  }

  return <Listing data={data} />;
}
