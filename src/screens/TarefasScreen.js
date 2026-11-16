import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Avatar, Button, Card, Dialog, FAB, Portal, ProgressBar, Searchbar, SegmentedButtons, Snackbar, Text } from 'react-native-paper';
import TarefaCard from '../components/TarefaCard';
import { tarefas } from '../data/tarefas';

export default function TarefasScreen({ navigation, route }) {
  const [listaTarefas, setListaTarefas] = useState(tarefas);
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('todas');
  const [tarefaExcluir, setTarefaExcluir] = useState(null);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (route.params?.novaTarefa) {
      setListaTarefas([route.params.novaTarefa, ...listaTarefas]);
    }
  }, [route.params?.novaTarefa]);

  const feitas = listaTarefas.filter((t) => t.feita).length;
  const progresso = listaTarefas.length > 0 ? feitas / listaTarefas.length : 0;

  let listaFiltrada = listaTarefas.filter(
    (t) => t.titulo.toLowerCase().includes(busca.toLowerCase()) || t.materia.toLowerCase().includes(busca.toLowerCase())
  );
  if (filtro === 'pendentes') listaFiltrada = listaFiltrada.filter((t) => !t.feita);
  if (filtro === 'feitas') listaFiltrada = listaFiltrada.filter((t) => t.feita);

  function marcarFeita(id) {
    setListaTarefas(listaTarefas.map((t) => (t.id === id ? { ...t, feita: !t.feita } : t)));
  }

  function handleExcluir() {
    setListaTarefas(listaTarefas.filter((t) => t.id !== tarefaExcluir.id));
    setMensagem('Tarefa excluída');
    setTarefaExcluir(null);
  }

  return (
    <View style={styles.container}>
      <Appbar.Header mode="center-aligned" elevated>
        <Appbar.Content title="Agenda de Estudos" />
      </Appbar.Header>

      <FlatList
        data={listaFiltrada}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 90 }}
        ListHeaderComponent={
          <>
            <Card mode="contained" style={styles.cardProgresso}>
              <Card.Title
                title="Seu progresso"
                subtitle={`${feitas} de ${listaTarefas.length} tarefas feitas`}
                left={(props) => <Avatar.Icon {...props} icon="school" />}
                right={() => <Text variant="titleLarge" style={{ marginRight: 16 }}>{Math.round(progresso * 100)}%</Text>}
              />
              <Card.Content style={{ paddingBottom: 16 }}>
                <ProgressBar progress={progresso} color="#00A389" style={{ height: 10, borderRadius: 5 }} />
              </Card.Content>
            </Card>
            <Searchbar placeholder="Buscar tarefa" value={busca} onChangeText={setBusca} style={styles.busca} />
            <SegmentedButtons
              value={filtro}
              onValueChange={setFiltro}
              style={styles.filtro}
              buttons={[
                { value: 'todas', label: 'Todas' },
                { value: 'pendentes', label: 'Pendentes' },
                { value: 'feitas', label: 'Feitas' },
              ]}
            />
          </>
        }
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa encontrada</Text>}
        renderItem={({ item }) => (
          <TarefaCard tarefa={item} marcar={() => marcarFeita(item.id)} excluir={() => setTarefaExcluir(item)} />
        )}
      />

      <FAB icon="plus" label="Nova tarefa" style={styles.fab} color="white" onPress={() => navigation.navigate('NovaTarefa')} />

      <Portal>
        <Dialog visible={tarefaExcluir != null} onDismiss={() => setTarefaExcluir(null)}>
          <Dialog.Title>Excluir tarefa?</Dialog.Title>
          <Dialog.Content>
            <Text>Tem certeza que quer excluir "{tarefaExcluir?.titulo}"?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setTarefaExcluir(null)}>Cancelar</Button>
            <Button textColor="#E5484D" onPress={handleExcluir}>Excluir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar visible={mensagem != ''} onDismiss={() => setMensagem('')} duration={2500}>
        {mensagem}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F5FF' },
  cardProgresso: { marginHorizontal: 16, marginTop: 12, backgroundColor: '#E7E0FF' },
  busca: { marginHorizontal: 16, marginTop: 12 },
  filtro: { marginHorizontal: 16, marginVertical: 12 },
  vazio: { textAlign: 'center', marginTop: 30, color: 'gray' },
  fab: { position: 'absolute', right: 16, bottom: 24, backgroundColor: '#00A389' },
});
