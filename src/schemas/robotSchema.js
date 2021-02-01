import { gql } from "@apollo/client";

const ROBOT_DATA = gql`
  {
    transactions(where: { metadata: { key: { _eq: "171411419" } } }) {
      metadata {
        key
        value
      }
    }
  }
`;

export default ROBOT_DATA;
