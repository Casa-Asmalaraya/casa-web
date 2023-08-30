import { useParams } from "@remix-run/react";

export function useCustomParams(param: string) {
  const params = useParams();

  const rawParam = params[param];
  return !rawParam || isNaN(+rawParam) ? null : +rawParam;
}
