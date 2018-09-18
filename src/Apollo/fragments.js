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

    phone
    timetable
    current_period

    snapchat_username
    instagram_username
    facebook_username

    school
  }
`;
