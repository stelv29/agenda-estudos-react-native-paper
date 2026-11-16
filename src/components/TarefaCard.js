import { StyleSheet, View } from 'react-native';
import { Card, Checkbox, Chip, IconButton, Text } from 'react-native-paper';
import { corPrioridade } from '../theme/tema';

export default function TarefaCard({ tarefa, marcar, excluir }) {
  const cor = corPrioridade[tarefa.prioridade];

  return (
    <Card style={[styles.card, { borderLeftColor: cor }]}>
      <View style={styles.linha}>
        <Checkbox.Android status={tarefa.feita ? 'checked' : 'unchecked'} onPress={marcar} color="#00A389" />
        <View style={{ flex: 1 }}>
          <Text variant="titleSmall" style={tarefa.feita && styles.riscado}>
            {tarefa.titulo}
          </Text>
          <View style={styles.chips}>
            <Chip compact icon="book-open-variant">{tarefa.materia}</Chip>
            <Chip compact icon="flag" textStyle={{ color: cor }}>
              {tarefa.prioridade}
            </Chip>
            {tarefa.revisao && <Chip compact icon="refresh">revisão</Chip>}
          </View>
        </View>
        <IconButton icon="trash-can-outline" iconColor="#E5484D" onPress={excluir} accessibilityLabel="Excluir tarefa" />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 16, marginVertical: 6, borderLeftWidth: 5 },
  linha: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  riscado: { textDecorationLine: 'line-through', color: 'gray' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
});
