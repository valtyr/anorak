import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {edgeToNode} from '../../Helpers/graphql';

import {Screen, Hero, TitleBar, ProfilePicture} from '../../Components';

// const dummyOffers = [
//   {
//     id: '1',
//     name: 'Hressingarskálinn',
//     percent: '20%',
//     description: '20% af öllum kokteilum á föstudögum frá 20 til 21.'
//   },
//
//   {
//     id: '2',
//     name: 'Hamborgarabúllan',
//     percent: '15%',
//     description: 'Afsláttur gildir aðeins á tilboði aldarinnar.'
//   },
//
//   {
//     id: '3',
//     name: 'Eymundsson',
//     percent: '10%'
//   },
//   {
//     id: '4',
//     name: 'Hressingarskálinn',
//     percent: '20%',
//     description: '20% af öllum kokteilum á föstudögum frá 20 til 21.'
//   },
//
//   {
//     id: '5',
//     name: 'Hamborgarabúllan',
//     percent: '15%',
//     description: 'Afsláttur gildir aðeins á tilboði aldarinnar.'
//   },
//
//   {
//     id: '6',
//     name: 'Eymundsson',
//     percent: '10%',
//     description: 'Gildir ekki á útsölu.'
//   }
// ];

const IdCard = ({person}) => (
  <View style={styles.idCardContainer}>
    <View style={styles.idCard}>
      <Text style={styles.idCardTitle}>
        {person.school.organizationName &&
          `${person.school.organizationName.toUpperCase()} – MEÐLIMUR`}
      </Text>
      <View style={styles.idCardContent}>
        <View style={styles.idCardProfileImage}>
          <ProfilePicture width={70} hash={person.imageHash} />
        </View>
        <View>
          <Text style={styles.idCardName}>{person.name}</Text>
          <Text style={styles.idCardSecondaryInfo}>
            {person.ssn}
            {person.group && ` | ${person.group}`}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

class Offer extends Component {
  render() {
    const {name, description, percent} = this.props.offer;

    return (
      <View style={styles.offer}>
        <View style={styles.offerTopLine}>
          <Text style={styles.offerName}>{name}</Text>
          <Text style={styles.offerPercent}>{percent}</Text>
        </View>

        {description && (
          <Text style={styles.offerDescription}>{description}</Text>
        )}
      </View>
    );
  }
}

const Offers = ({navigation, data}) => {
  return (
    <Screen title="Tilboð" onBack={() => navigation.goBack()}>
      {data.currentUser && (
        <View>
          <Hero />
          <TitleBar title="Tilboð" white />
          <IdCard person={data.currentUser} />
          <View style={styles.offers}>
            {data.offers &&
              edgeToNode(data.offers).map(offer => (
                <Offer key={offer.id} offer={offer} />
              ))}
          </View>
        </View>
      )}
    </Screen>
  );
};

const OffersQuery = gql`
  query offersQuery {
    currentUser {
      id
      name
      group
      imageHash
      ssn
      school {
        id
        organizationName
      }
    }
    offers {
      edges {
        node {
          id
          name
          description
          percent
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  idCardContainer: {
    marginTop: 20
  },
  idCard: {
    shadowColor: 'black',
    shadowOffset: {
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 10,
    aspectRatio: 1.586,
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    padding: 20
  },
  idCardTitle: {
    fontWeight: '800',
    color: 'rgb(214, 211, 235)',
    textAlign: 'center'
  },
  idCardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  idCardProfileImage: {
    marginRight: 15
  },
  idCardName: {
    fontWeight: '600'
  },
  idCardSecondaryInfo: {
    fontWeight: '400',
    color: 'rgb(147, 147, 147)'
  },

  offers: {
    marginTop: 20,
    marginBottom: 30
  },

  offer: {
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 15,
    paddingTop: 15,
    padding: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgb(228, 228, 228)'
  },
  offerTopLine: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  offerDescription: {
    marginTop: 10
  },
  offerName: {
    fontWeight: '600',
    fontSize: 15
  },
  offerPercent: {
    color: 'rgb(152, 152, 152)',
    fontSize: 15
  }
});

export default graphql(OffersQuery)(Offers);
