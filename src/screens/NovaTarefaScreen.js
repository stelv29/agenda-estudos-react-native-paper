import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Divider, HelperText, List, SegmentedButtons, Switch, Text, TextInput } from 'react-native-paper';

export default function NovaTarefaScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState('');
  const [prioridade, setPrioridade] = useState('media');
  const [revisao, setRevisao] = useState(false);
  const [erro, setErro] = useState(false);

  function handleSalvar() {
    if (titulo == '' || materia == '') {
      setErro(true);
      return;
    }
    const novaTarefa = {
      id: String(Date.now()),
      titulo: titulo,
      materia: materia,
      prioridade: prioridade,
      revisao: revisao,
      feita: false,
    };
    navigation.popTo('Tarefas', { novaTarefa: novaTarefa });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F5FF' }}>
      <Appbar.Header mode="center-aligned" elevated>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Nova tarefa" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text variant="titleLarge" style={styles.titulo}>O que você vai estudar?</Text>

        <TextInput
          mode="outlined"
          label="Título da tarefa"
          value={titulo}
          onChangeText={setTitulo}
          left={<TextInput.Icon icon="pencil" />}
          error={erro && titulo == ''}
        />
        <HelperText type="error" visible={erro && titulo == ''}>Preencha o título</HelperText>

        <TextInput
          mode="outlined"
          label="Matéria"
          value={materia}
          onChangeText={setMateria}
          left={<TextInput.Icon icon="book-open-variant" />}
          error={erro && materia == ''}
        />
        <HelperText type="error" visible={erro && materia == ''}>Preencha a matéria</HelperText>

        <Text variant="titleSmall" style={{ marginBottom: 8 }}>Prioridade</Text>
        <SegmentedButtons
          value={prioridade}
          onValueChange={setPrioridade}
          buttons={[
            { value: 'baixa', label: 'Baixa' },
            { value: 'media', label: 'Média' },
            { value: 'alta', label: 'Alta' },
          ]}
        />

        <Divider style={{ marginTop: 16 }} />

        <List.Item
          title="Marcar como revisão"
          left={(props) => <List.Icon {...props} icon="refresh" />}
          right={() => <Switch value={revisao} onValueChange={setRevisao} color="#00A389" />}
        />

        <View style={styles.botoes}>
          <Button mode="outlined" style={{ flex: 1 }} onPress={() => navigation.goBack()}>Cancelar</Button>
          <Button mode="contained" style={{ flex: 1 }} icon="content-save" onPress={handleSalvar}>Salvar</Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: { color: '#5B3FD9', fontWeight: 'bold', marginBottom: 12 },
  botoes: { flexDirection: 'row', gap: 12, marginTop: 24 },
});
