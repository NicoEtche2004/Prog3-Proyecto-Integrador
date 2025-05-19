import { View, Text } from 'react-native'
import React from 'react'

export default function Pagina2(props) {
  console.log('props de la Pag2', props)
  //Para recuperar parametros lo recupero desde el props.route
  const id = props.route.params.id
  return (
    <View>
      <Text>Pagina2 del id: {id}</Text>
    </View>
  )
}