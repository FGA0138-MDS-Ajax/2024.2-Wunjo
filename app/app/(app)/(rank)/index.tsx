import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  View,
  Text,
  Modal,
  StyleSheet,
} from 'react-native';

import { Button } from '@/components/ui/button2';

import GestureRecognizer from 'react-native-swipe-gestures';

import SVGChest from '@/assets/images/chest';
import SVGIslandChest from '@/assets/images/island-chest';
import SVGOpenChest from '@/assets/images/open-chest';
import SVGCoin from '@/assets/images/coin';
import SVGSignHolder from '@/assets/images/sign-holder';
import SVGWoodPattern from '@/assets/images/wood-pattern';
import SVGUserIcon from '@/assets/images/user-icon';
import SVGPirateHat from '@/assets/images/pirate-hat';
import { useQuery } from '@tanstack/react-query';
import { RankingService } from '@/services/http/services';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { Box } from '@/components/ui/box';
import { useUnBordo } from '@/hooks/unbordo';

type Person = {
  id: string;
  name: string;
  title: string;
  position: number;
  coins: number;
  profile_picture: string;
};

const season_end = new Date(2025, 6, 25, 12, 0, 0);

const show_max_people = Infinity;

function Person({
  id,
  name,
  title,
  coins,
  position,
}: {
  id: string;
  name: string;
  title: string;
  coins: number;
  position: number;
}) {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
        borderRadius: 8,
        minHeight: 67,
      }}
    >
      {/* Position */}
      <View
        style={
          {
            // backgroundColor: "green"
          }
        }
      >
        <Text
          className="font-itim"
          style={{
            color: 'black',
            fontSize: 24,
            minWidth: 40,
            textAlign: 'center',
          }}
        >
          {position}º
        </Text>
      </View>

      {/* Profile picture */}
      <View>
        <SVGUserIcon size={48} />
      </View>

      {/* Name, title */}
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 10,
        }}
      >
        <Text
          className="font-raleway"
          style={{
            color: 'black',
            fontSize: 16,
          }}
        >
          {name}
        </Text>
        <Text
          className="font-itim"
          style={{
            fontSize: 14,
            color: '#173CAC',
          }}
        >
          {title}
        </Text>
      </View>

      {/* Coins */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 5,
          // backgroundColor: "green"
        }}
      >
        <Text
          className="font-itim"
          style={{
            color: '#173CAC',
            // backgroundColor: "pink",
            fontSize: 24,
            marginBottom: -2,
          }}
        >
          {coins}
        </Text>
        <SVGCoin
          style={
            {
              // backgroundColor: "red"
            }
          }
        />
      </View>
    </View>
  );
}

function RestRanking({
  people,
  currentUserShown,
}: {
  people: Array<Person>;
  currentUserShown: boolean;
}) {
  const {
    auth: { student },
  } = useUnBordo();

  const reordered = people.slice(3, show_max_people);

  const has_current_user = reordered.some((person) => person.id === student.id);

  if (!has_current_user && !currentUserShown) {
    reordered[reordered.length - 1] = {
      coins: 0,
      name: 'Você',
      title: student.course,
      position: reordered.length + 4,
      id: student.id,
      profile_picture: student.avatarUrl,
    };
  }

  if (reordered.length === 0) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Text className="font-raleway text-center text-white text-lg">
          Aparecem aqui os piratas que estão com o ranking ativado. Veja no seu
          perfil!
        </Text>
      </View>
    );
  }

  return reordered.map((person) => (
    <Person
      id={person.id}
      key={person.id}
      name={person.name}
      title={person.title}
      coins={person.coins}
      position={person.position}
    />
  ));
}

function TopThreePerson({
  id,
  name,
  title,
  coins,
  position,
}: {
  id: string;
  name: string;
  title: string;
  coins: number;
  position: number;
}) {
  return (
    <View
      style={{
        width: 66,
        height: '100%',
        justifyContent: position === 1 ? 'flex-start' : 'center',
        alignItems: 'center',
        paddingTop: 20,
      }}
    >
      <View
        style={{
          position: 'relative',
        }}
      >
        <SVGUserIcon size={66} />
        <Text
          className="font-itim"
          style={{
            position: 'absolute',
            fontSize: 24,
            left: -12,
            top: -12,
            color: 'white',
          }}
        >
          {position}º
        </Text>
        {position === 1 && (
          <View
            style={{
              position: 'absolute',
              top: '-25%',
              right: 0,
            }}
          >
            <SVGPirateHat width={40} height={40} />
          </View>
        )}
      </View>
      <Text
        className="font-raleway"
        style={{
          color: 'white',
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        {name}
      </Text>
      <Text
        className="font-itim"
        style={{
          color: 'white',
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
    </View>
  );
}

function TopFirstThree({ people }: { people: Array<Person> }) {
  const reordered = [people[1], people[0], people[2]];

  return reordered.map((person, index) => {
    console.log(person);

    if (!person)
      return (
        <TopThreePerson
          id={'231'}
          key={'321'}
          name={'Outro pirata aqui!'}
          title={'Vamos lá!'}
          position={index == 0 ? 2 : index == 1 ? 1 : 3}
          coins={0}
        />
      );
    return (
      <TopThreePerson
        id={person.id}
        key={person.id}
        name={person.name}
        title={person.title}
        position={person.position}
        coins={person.coins}
      />
    );
  });
}

function Chest({
  id,
  name,
  progress,
  completed,
  redeemed,
  onPress,
}: {
  id: number;
  name: string;
  progress: number;
  redeemed: boolean;
  completed: boolean;
  onPress: () => void;
}) {
  const width = 120;
  const progress_bar = {
    height: 10,
    multiplier: 2.25,
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        minWidth: width,
        height: 77,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'black',
        borderStyle: 'solid',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
        rowGap: 5,
        position: 'relative',
      }}
    >
      <View
        style={{
          flex: 1,
          width: '100%',
          paddingHorizontal: 10,
        }}
      >
        <Text
          className="font-raleway-bold"
          style={{
            // backgroundColor: "blue",
            fontSize: 12,
            textAlign: 'center',
            color: '#703111',
          }}
        >
          {name}
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          width: '100%',
          // backgroundColor: 'red',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <SVGChest />
      </View>
      {progress === 100 && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
      )}

      {/* Progress bar */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height:
            progress === 100
              ? progress_bar.height * progress_bar.multiplier
              : progress_bar.height,
          borderTopWidth: 2,
          borderColor: 'black',
          borderStyle: 'solid',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '101%',
            width: progress === 100 ? `${progress}%` : `${progress + 7.5}%`,
            borderTopRightRadius:
              progress === 100
                ? progress_bar.height * progress_bar.multiplier
                : progress_bar.height,
            borderBottomRightRadius:
              progress === 100
                ? progress_bar.height * progress_bar.multiplier
                : progress_bar.height,
            backgroundColor: '#1A1A2D',
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '101%',
            width: `${progress}%`,
            borderTopRightRadius: progress === 100 ? 0 : progress_bar.height,
            borderBottomRightRadius: progress === 100 ? 0 : progress_bar.height,
            backgroundColor: completed ? '#1A1A2D' : '#173CAC',
          }}
        />
        {progress === 100 && (
          <Text
            className="font-raleway-bold"
            style={{
              textAlign: 'center',
              lineHeight: progress_bar.height * progress_bar.multiplier - 2,
              fontSize: 12,
              color: 'white',
            }}
          >
            {(completed && 'COMPLETA') || 'RESGATAR'}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

/**
 * Format the string into: `DDd HHh` compared to today (time left.)
 * @param {Date} date
 * @returns {string}
 */
function format_left_date(date: Date) {
  let output = '';

  const today = new Date();
  const diff = date.getTime() - today.getTime();

  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  if (months > 0) output += `${months}m `;

  if (days > 0) output += `${days}d `;

  if (hours > 0) output += `${hours}h `;

  if (minutes > 0 && months === 0 && days === 0) output += `${minutes}m `;

  if (seconds > 0 && months === 0 && days === 0 && hours === 0 && minutes === 0)
    output += `${seconds}s `;

  return output;
}

export default function Screen() {
  const [chests, setChests] = useState([
    {
      id: 1,
      name: 'Primeira pergunta',
      description: 'Faça a sua primeira pergunta',
      progress: 100,
      prize: { min: 10, max: 20 },
      redeemed: false,
      completed: false,
    },
    {
      id: 2,
      name: 'O Tutor Rei',
      description: 'Respondeu mais de 100 perguntas',
      progress: 75,
      prize: { min: 150, max: 150 },
      redeemed: false,
      completed: false,
    },
    {
      id: 3,
      name: 'Tutorando pela primeira vez',
      description: 'Respondeu a primeira pergunta',
      prize: { min: 10, max: 10 },
      progress: 50,
      redeemed: false,
      completed: false,
    },
    {
      id: 4,
      name: '10 dúvidas respondidas',
      description: 'Respondeu a 10 perguntas',
      prize: { min: 50, max: 100 },
      progress: 25,
      redeemed: false,
      completed: false,
    },
    {
      id: 5,
      name: '10 dúvidas feitas',
      description: 'Fez 10 perguntas',
      prize: { min: 50, max: 100 },
      progress: 0,
      redeemed: false,
      completed: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const [currentChest, setCurrentChest] = useState(0);
  const [missionName, setMissionName] = useState('Nome da missão');
  const [description, setDescription] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut magna',
  );
  const [progress, setProgress] = useState(50);
  const [prize, setPrize] = useState({
    min: 10,
    max: 100,
  });
  const [currentUserShown, setCurrentUserShown] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const [completed, setCompleted] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ['ranking'],
    queryFn: RankingService.fetch,
  });

  if (isFetching) {
    return (
      <Box className="w-full px-4 gap-6 mt-12">
        <Skeleton className="w-full h-8 bg-gray-200 rounded-lg" />
        <Skeleton className="w-full h-8 bg-gray-200 rounded-lg" />
        <Skeleton className="w-full h-full bg-gray-200 rounded-lg"></Skeleton>
      </Box>
    );
  }

  const ranking = data?.data.ranking;
  const season = data?.data.season;

  if (!ranking || !season) {
    return (
      <View>
        <Text>Erro ao carregar dados</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
      }}
    >
      <View
        style={{
          backgroundColor: '#FFFFFF',
          // flex: ,
          maxHeight: '30%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          elevation: 10,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 25 },
          shadowOpacity: 0.75,
          paddingBottom: 15,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            marginTop: 20,
          }}
        >
          <Text
            className="font-itim"
            style={{
              // paddingBottom: 10,
              fontSize: 32,
              lineHeight: 32,
              color: 'black',
            }}
          >
            Missões
          </Text>
        </View>

        <View className="h-[50%] items-center justify-center">
          <Text className="font-itim">Em breve...</Text>
        </View>
        {/* <ScrollView
          horizontal
          style={{
            flex: 1.5,
            width: "100%",
            borderRadius: 8,
            elevation: 12,
          }}
          contentContainerStyle={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
            paddingHorizontal: 10,
            backgroundColor: "#F5F6FA",
          }}
        >
          {
            chests.map(chest => <Chest
                key={chest.id}
                id={chest.id}
                name={chest.name}
                progress={chest.progress}
                redeemed={chest.redeemed}
                completed={chest.completed}
                onPress={() => {
                  setCurrentChest(chest.id);
                  setMissionName(chest.name);
                  setDescription(chest.description);
                  setProgress(chest.progress);
                  setPrize(chest.prize);
                  setRedeemed(chest.redeemed);
                  setCompleted(chest.completed);
                  setModalVisible(true);
                }}
            />)
          }
        </ScrollView> */}
      </View>
      <View
        style={{
          flex: 4,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            padding: 10,
            paddingTop: 50,
            position: 'relative',
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 16,
              elevation: 10,
              position: 'relative',
            }}
          >
            <SVGSignHolder
              style={{
                alignSelf: 'center',
                position: 'absolute',
                bottom: '95%',
              }}
            />
            <View
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                backgroundColor: '#AF5C3D',
                borderRadius: 16,
                overflow: 'hidden',
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: 'black',
              }}
            >
              {/* Wood pattern (absolute) */}
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                }}
              >
                <SVGWoodPattern
                  resizeMode="repeat"
                  style={{
                    ...StyleSheet.absoluteFillObject,
                  }}
                />
              </View>

              {/* First three of the ranking */}
              <View
                style={{
                  flex: 1.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                >
                  <TopFirstThree
                    people={
                      ranking.map((people, index) => ({
                        coins: people.points,
                        id: people.student.id,
                        name: people.student.name,
                        position: index + 1,
                        profile_picture: people.student.avatarUrl,
                        title: people.student.course as string,
                      })) || []
                    }
                  />
                </View>

                {/* Time left of this season (absolute). */}
                <View
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    maxWidth: 100,
                    height: 50,
                  }}
                >
                  <Text
                    className="font-raleway"
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    Termina em:{' '}
                    {format_left_date(
                      new Date(season.createdAt! + 1000 * 60 * 60 * 24 * 180),
                    )}
                  </Text>
                </View>

                {/* Bottom bar. */}
                <View
                  style={{
                    height: 2,
                    width: '50%',
                    backgroundColor: 'white',
                  }}
                />
              </View>

              {/* Next four of the ranking (replace last with current user info) */}
              <View
                style={{
                  flex: 2,
                  padding: 20,
                }}
              >
                <ScrollView
                  horizontal={false}
                  style={{
                    width: '100%',
                    paddingBottom: 55,
                  }}
                  contentContainerStyle={{
                    rowGap: 10,
                    paddingBottom: '40%',
                  }}
                >
                  <RestRanking
                    currentUserShown={currentUserShown}
                    people={
                      ranking.map((person, index) => ({
                        id: person.student.id,
                        name: person.student.name,
                        coins: person.points,
                        position: index + 1,
                        profile_picture: person.student.avatarUrl,
                        title: person.student.course as string,
                      })) || []
                    }
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </View>
      <GestureRecognizer
        onSwipeDown={() => setModalVisible(false)}
        style={{
          // height: "100%",
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          transparent
          style={{
            height: '100%',
            borderRadius: 0,
            position: 'absolute',
            backgroundColor: 'red',
          }}
        >
          <Pressable
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            }}
            onPress={() => setModalVisible(false)}
          ></Pressable>
          <View
            style={{
              width: '80%',
              minHeight: `${progress === 100 ? 60 : 50}%`,
              bottom: `-25%`,
              backgroundColor: '#FFFFFF',
              alignSelf: 'center',
              borderRadius: 8,
              padding: 40,
              paddingTop: 20,
              elevation: 10,
              rowGap: 20,
            }}
          >
            <Text
              className="font-raleway-bold"
              style={{
                fontSize: 24,
                color: '#703111',
                textAlign: 'center',
              }}
            >
              {missionName}
            </Text>

            {/* Chest open/locked */}
            <View
              style={{
                // minHeight: 140,
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {(redeemed && !completed && <SVGOpenChest />) || (
                <SVGIslandChest />
              )}
            </View>

            {(redeemed && !completed && (
              <View
                style={{
                  // backgroundColor: "pink",
                  justifyContent: 'center',
                  alignItems: 'center',
                  rowGap: 15,
                }}
              >
                <Text
                  className="font-itim"
                  style={{
                    fontSize: 24,
                    color: '#703111',
                    textAlign: 'center',
                  }}
                >
                  Parabéns, pirata! Você ganhou:
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: "white",
                    justifyContent: 'center',
                    alignItems: 'center',
                    columnGap: 4,
                  }}
                >
                  <Text
                    className="font-itim"
                    style={{
                      fontSize: 20,
                      color: '#173CAC',
                    }}
                  >
                    {prize.max}
                  </Text>
                  <SVGCoin />
                </View>
              </View>
            )) || (
              <View
                style={{
                  flex: 4,
                  rowGap: 25,
                }}
              >
                <View
                  style={
                    {
                      // backgroundColor: "blue"
                    }
                  }
                >
                  <Text
                    className="font-itim"
                    style={{
                      fontSize: 16,
                    }}
                  >
                    Descrição
                  </Text>
                  <Text
                    className="font-raleway"
                    style={{
                      fontSize: 12,
                    }}
                  >
                    {description}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    columnGap: 25,
                  }}
                >
                  <Text
                    className="font-itim"
                    style={{
                      fontSize: 16,
                    }}
                  >
                    Progresso: {progress}%
                  </Text>
                  {progress === 100 && (
                    <View
                      style={{
                        backgroundColor: '#008940',
                        paddingHorizontal: 10,
                        borderRadius: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        className="font-itim"
                        style={{
                          color: 'white',
                          fontSize: 14,
                        }}
                      >
                        Completa
                      </Text>
                    </View>
                  )}
                </View>

                <View
                  style={{
                    // backgroundColor: "green",
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 5,
                  }}
                >
                  <Text
                    className="font-itim"
                    style={{
                      fontSize: 16,
                    }}
                  >
                    Você pode ganhar:
                  </Text>
                  <Text
                    className="font-itim"
                    style={{
                      fontSize: 16,
                      color: '#173CAC',
                      paddingLeft: 15,
                    }}
                  >
                    {prize.min}-{prize.max}
                  </Text>
                  <SVGCoin
                    style={
                      {
                        // backgroundColor: "blue"
                      }
                    }
                  />
                </View>
              </View>
            )}

            {progress === 100 && (
              <View>
                <Button
                  label={
                    redeemed
                      ? completed
                        ? 'Resgatado'
                        : 'Continuar'
                      : 'Resgatar'
                  }
                  color={redeemed ? (completed ? 'black' : 'blue') : 'blue'}
                  onPress={() => {
                    if (completed) {
                      setModalVisible(false);
                      return;
                    } else if (redeemed) {
                      setCompleted(true);
                      for (let i = 0; i < chests.length; i++) {
                        if (chests[i].id === currentChest) {
                          chests[i].completed = true;
                          break;
                        }
                      }

                      return;
                    }
                    setRedeemed(true);
                    for (let i = 0; i < chests.length; i++) {
                      if (chests[i].id === currentChest) {
                        chests[i].redeemed = true;
                        break;
                      }
                    }
                    setChests(chests);
                  }}
                />
              </View>
            )}
          </View>
        </Modal>
      </GestureRecognizer>
    </View>
  );
}
