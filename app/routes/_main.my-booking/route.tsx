import { Container } from "@mui/material";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { useCreateOrb } from "worb";
import { Configuration } from "~/constants/configuration";
import { InBookingDto } from "~/dtos/booking/in-booking-dto";
import PageHeader from "./PageHeader";
import PageTable from "./PageTable";
import { useLoadingDialog } from "~/components/LoadingDialog";
import { DataResponse } from "~/data-response";
import { loaderServer } from "./loader.server";
import { useLoading } from "~/components/Loading";
import { UrlUtils } from "~/utils/url-utils";

export function meta() {
  return [{ title: "Cek Booking - LokalPlace" }];
}

export async function loader(args: LoaderFunctionArgs) {
  return loaderServer(args);
}

export default function Page() {
  const fetcher = useFetcher();
  const loaderData = useLoaderData<DataResponse<InBookingDto[]>>();
  const loading = useLoading();
  const loadingDialog = useLoadingDialog();

  const data = useCreateOrb(loaderData.data);
  const page = useRef(1);
  const searchQuery = useCreateOrb<string | undefined>(undefined);

  useEffect(() => {
    if (loaderData.data.length < Configuration.itemPerPage) {
      page.current = -1;
    }

    searchQuery.addListener(onSearchQueryChanged);

    return () => {
      searchQuery.removeListener(onSearchQueryChanged);
    };
  }, []);

  useEffect(() => {
    const fetcherData = fetcher.data as unknown as DataResponse<any>;

    if (fetcher.state === "submitting") {
      loadingDialog.showLoadingDialog();
    }

    if (fetcher.state === "loading") {
      loading.showLoading();
    }

    if (fetcher.state === "idle") {
      loading.hideLoading();
      loadingDialog.hideLoadingDialog();
    }

    if (!fetcherData || fetcher.state !== "idle") {
      return;
    }

    if (fetcherData.method === "GET") {
      const newData = fetcherData.data as InBookingDto[];
      if (newData.length < Configuration.itemPerPage) {
        page.current = -1;
      } else {
        page.current++;
      }

      data.value = [...data.value, ...newData];
    }
  }, [fetcher.state]);

  function onSearchQueryChanged() {
    data.value = [];
    page.current = 1;

    fetchData();
  }

  function onEndReached() {
    if (page.current === -1) {
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

  return (
    <Container
      sx={{
        flex: "1",
        display: "flex",
        paddingY: "32px",
        paddingX: { xs: "16px", md: "32px" },
        gap: { xs: "16px", md: "32px" },
        flexDirection: "column",
      }}
      disableGutters
    >
      <PageHeader searchQuery={searchQuery} />
      <PageTable data={data} onEndReached={onEndReached} />
    </Container>
  );
}
