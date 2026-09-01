import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Cadastro from "./screens/Cadastro";
import DetalhesLivros from "./screens/DetalhesLivros";
import CadastroLivro from "./screens/CadastroLivro";
import EditarLivro from "./screens/EditarLivro";
import ListaUsuarios from "./screens/ListaUsuarios";
import EditarUsuario from "./screens/EditarUsuario";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName={"Login"}>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
              <Stack.Screen name="DetalhesLivros" component={DetalhesLivros} options={{ headerShown: false }} />
              <Stack.Screen name="CadastroLivro" component={CadastroLivro} options={{ headerShown: false }} />
              <Stack.Screen name="EditarLivro" component={EditarLivro} options={{ headerShown: false }} />
              <Stack.Screen name="ListaUsuarios" component={ListaUsuarios} options={{ headerShown: false }} />
              <Stack.Screen name="EditarUsuario" component={EditarUsuario} options={{ headerShown: false }} />
          </Stack.Navigator>
      </NavigationContainer>
  )
}