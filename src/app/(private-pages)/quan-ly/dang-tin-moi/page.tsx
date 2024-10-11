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
  const [provincesResult, districtsResult, wardsResult] = await Promise.all([
    query({ query: GET_PROVINCES_QUERY }),
    query({ query: GET_DISTRICTS_QUERY }),
    query({ query: GET_WARDS_QUERY }),
  ]);

  const {
    data: { getProvinces },
  }: { data: { getProvinces: GetProvincesOutput } } = provincesResult;

  const {
    data: { getDistricts },
  }: { data: { getDistricts: GetDistrictsOutput } } = districtsResult;

  const {
    data: { getWards },
  }: { data: { getWards: GetWardsOutput } } = wardsResult;

  return (
    <NewPostPageContent
      provinces={getProvinces.ok ? getProvinces.provinces : []}
      districts={getDistricts.ok ? getDistricts.districts : []}
      wards={getWards.ok ? getWards.wards : []}
    />
  );
};

export default Page;
