import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
  Pressable,
  TouchableHighlight
} from 'react-native';

export default function App() {
  const [texto, setTexto] = useState('');
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Opción 1');
  const [contador, setContador] = useState(0);

  const opciones = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];

  const datos = [
    { id: '1', nombre: 'Juan', edad: 25 },
    { id: '2', nombre: 'María', edad: 30 },
    { id: '3', nombre: 'Pedro', edad: 28 },
    { id: '4', nombre: 'Ana', edad: 22 },
    { id: '5', nombre: 'Luis', edad: 35 }
  ];

  const mostrarAlerta = () => {
    Alert.alert('Alerta', 'Este es un mensaje de alerta básico');
  };

  const mostrarAlertaAvanzada = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de realizar esta acción?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Aceptar', onPress: () => console.log('Aceptado') }
      ]
    );
  };

  const iniciarCarga = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Completado', 'Proceso terminado');
    }, 3000);
  };

  const renderItem = ({ item }) => (
    <TouchableHighlight
      style={{ backgroundColor: '#f9f9f9' }}
      onPress={() => Alert.alert('Usuario', `Seleccionaste a ${item.nombre}`)}
      underlayColor="#e0e0e0"
    >
      <View style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
        <Text style={{ fontSize: 16 }}>{item.nombre} - {item.edad} años</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 20 }}>
        
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
          Aplicación con 10+ Componentes React Native
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 5 }}>Ingresa tu nombre:</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }}
          placeholder="Tu nombre aquí"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={{ fontSize: 16, marginBottom: 5 }}>Ingresa tu edad:</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }}
          placeholder="Tu edad"
          value={edad}
          onChangeText={setEdad}
          keyboardType="numeric"
        />

        <Button 
          title="Mostrar Alerta Simple"
          onPress={mostrarAlerta}
        />

        <View style={{ marginTop: 10 }}>
          <Button 
            title="Mostrar Alerta con Opciones"
            onPress={mostrarAlertaAvanzada}
            color="#ff6b6b"
          />
        </View>

        <TouchableOpacity 
          style={{ backgroundColor: 'blue', padding: 15, marginTop: 15, marginBottom: 15, borderRadius: 8 }}
          onPress={() => setContador(contador + 1)}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
            Contador: {contador} (Toca para incrementar)
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16 }}>Activar modo especial: </Text>
          <Switch
            value={switchValue}
            onValueChange={setSwitchValue}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={switchValue ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
        <Text style={{ marginBottom: 15, fontStyle: 'italic' }}>
          Estado: {switchValue ? 'Activado' : 'Desactivado'}
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 10 }}>Imagen de ejemplo:</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/200x150/4CAF50/ffffff?text=React+Native' }}
          style={{ width: 200, height: 150, marginBottom: 15, alignSelf: 'center', borderRadius: 10 }}
        />

        <Text style={{ fontSize: 16, marginBottom: 10 }}>Selecciona una opción:</Text>
        <View style={{ marginBottom: 15 }}>
          {opciones.map((opcion, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => ({
                backgroundColor: selectedValue === opcion ? '#007AFF' : (pressed ? '#e0e0e0' : '#f0f0f0'),
                padding: 15,
                marginVertical: 2,
                borderRadius: 5
              })}
              onPress={() => setSelectedValue(opcion)}
            >
              <Text style={{
                color: selectedValue === opcion ? 'white' : 'black',
                textAlign: 'center',
                fontSize: 16
              }}>
                {opcion}
              </Text>
            </Pressable>
          ))}
        </View>

        <Button
          title="Abrir Modal"
          onPress={() => setModalVisible(true)}
          color="#28a745"
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
              <Text style={{ fontSize: 20, marginBottom: 15, textAlign: 'center', fontWeight: 'bold' }}>
                Información del Usuario
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 10 }}>Nombre: {nombre || 'No especificado'}</Text>
              <Text style={{ fontSize: 16, marginBottom: 10 }}>Edad: {edad || 'No especificada'}</Text>
              <Text style={{ fontSize: 16, marginBottom: 10 }}>Opción seleccionada: {selectedValue}</Text>
              <Text style={{ fontSize: 16, marginBottom: 15 }}>Modo especial: {switchValue ? 'Activado' : 'Desactivado'}</Text>
              <Button
                title="Cerrar Modal"
                onPress={() => setModalVisible(false)}
                color="#dc3545"
              />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={{ backgroundColor: 'green', padding: 15, marginTop: 15, borderRadius: 8 }}
          onPress={iniciarCarga}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
            Iniciar Proceso de Carga (3 segundos)
          </Text>
        </TouchableOpacity>

        {loading && (
          <View style={{ alignItems: 'center', marginTop: 15, padding: 20 }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ marginTop: 10, fontSize: 16 }}>Procesando...</Text>
          </View>
        )}

        <Text style={{ fontSize: 18, marginTop: 25, marginBottom: 10, fontWeight: 'bold' }}>
          Lista de Usuarios (toca para seleccionar):
        </Text>
        <FlatList
          data={datos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{ backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 15 }}
          showsVerticalScrollIndicator={false}
        />

        <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 10 }}>Área de texto libre:</Text>
        <TextInput
          style={{ 
            borderWidth: 1, 
            borderColor: '#ccc', 
            padding: 10, 
            height: 100, 
            marginBottom: 20, 
            borderRadius: 5,
            textAlignVertical: 'top'
          }}
          placeholder="Escribe algo aquí..."
          multiline={true}
          value={texto}
          onChangeText={setTexto}
        />

        <View style={{ backgroundColor: '#f8f9fa', padding: 15, borderRadius: 8, marginTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
            Componentes Utilizados:
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>1. View - Contenedor principal</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>2. Text - Textos y etiquetas</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>3. TextInput - Campos de entrada</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>4. Button - Botones estándar</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>5. TouchableOpacity - Botones personalizados</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>6. Image - Mostrar imágenes</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>7. ScrollView - Scroll vertical</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>8. Switch - Interruptor on/off</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>9. Modal - Ventana emergente</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>10. FlatList - Lista de datos</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>11. ActivityIndicator - Indicador de carga</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>12. Pressable - Botones con control táctil avanzado</Text>
          <Text style={{ fontSize: 14, marginBottom: 5 }}>13. TouchableHighlight - Botones con efecto highlight</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </View>
    </ScrollView>
  );
}