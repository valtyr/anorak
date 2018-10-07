import gql from 'graphql-tag';

export const userFragment = gql`
  fragment userFragment on User {
    id
    name
    ssn
    birthday
    age
    group
    address
    city
    postcode
    status
    image_hash
    access_enabled

    phone {
      id
      countryCode
      number
    }

    snapchat_username
    instagram_username
    facebook_username

    school {
      id
      name
      code
      organization_name
    }
  }
`;
