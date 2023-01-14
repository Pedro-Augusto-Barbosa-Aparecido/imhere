import {useState} from "react"

import { Text, TextInput, View, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native"
import { styles } from "./styles"

import { Participant } from "../../components/participant"

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantInputValue, setParticipantInputValue] = useState<string>("")

  async function handleParticipantAdd (name: string) {
    setParticipantInputValue("")
    
    if (!name.trim()) {
      return Alert.alert("Nome inválido", "Insira um nome válido")
    }

    if (participants.includes(name.trim())) {
      return Alert.alert("Participante já existe", "Já existe um participante na lista de convidados");
    }

    setParticipants(state => [name.trim(), ...state])
  }
  async function handleParticipantRemove (name: string) {
    Alert.alert("Remover", `Remover o participante ${name}`, [
      {
        text: "Sim",
        onPress: () => {
          setParticipants(state => state.filter(participant => participant != name))
          Alert.alert("Removido", `Participante ${name} foi removido`)
        }
      },
      {
        text: "Não",
        style: "cancel"
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do Evento
      </Text>
      <Text style={styles.eventDate}>
        Sexta, 4 de novembro de 2022
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          value={participantInputValue}
          onChangeText={setParticipantInputValue}
        />

        <TouchableOpacity style={styles.button} onPress={() => handleParticipantAdd(participantInputValue)}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => 
          <Participant 
            key={item} 
            name={item} 
            onRemove={handleParticipantRemove} 
          />
        }

        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença
          </Text>
        }}
      />
    </View>
  )
}