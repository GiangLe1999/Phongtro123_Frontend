import {
  GetDistrictsOutput,
  GetProvincesOutput,
  GetWardsOutput,
} from "@/src/__generated__/graphql";
import NewPostPageContent from "@/src/components/pages/private/new-post-page/new-post-page-content";
import { query } from "@/src/lib/apollo/client";
import { gql } from "@apollo/client";
import { NextPage } from "next";

interface Props {}

const GET_PROVINCES_QUERY = gql`
  query getProvinces {
    getProvinces {
      ok
      error
      provinces {
        name
        code
      }
    }
  }
`;

const GET_DISTRICTS_QUERY = gql`
  query getDistricts {
    getDistricts {
      ok
      error
      districts {
        name
        code
        province {
          code
        }
      }
    }
  }
`;

const GET_WARDS_QUERY = gql`
  query getWards {
    getWards {
      ok
      error
      wards {
        name
        code
        district {
          code
        }
      }
    }
  }
`;

const Page: NextPage<Props> = async () => {
  const {
    data: { getProvinces },
  }: { data: { getProvinces: GetProvincesOutput } } = await query({
    query: GET_PROVINCES_QUERY,
  });

  const {
    data: { getDistricts },
  }: { data: { getDistricts: GetDistrictsOutput } } = await query({
    query: GET_DISTRICTS_QUERY,
  });

  const {
    data: { getWards },
  }: { data: { getWards: GetWardsOutput } } = await query({
    query: GET_WARDS_QUERY,
  });

  return (
    <NewPostPageContent
      provinces={getProvinces.ok ? getProvinces.provinces : []}
      districts={getDistricts.ok ? getDistricts.districts : []}
      wards={getWards.ok ? getWards.wards : []}
    />
  );
};

export default Page;
