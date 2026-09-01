import * as LocalAuthentication from 'expo-local-authentication';

export async function getBiometria() {

    const possuiBiometria = await LocalAuthentication.hasHardwareAsync();

    if (!possuiBiometria) {
        console.log('Biometria indisponível');
        return true;
    }

    const biometriaCadastrada = await LocalAuthentication.isEnrolledAsync();

    if (!biometriaCadastrada) {
        console.log('Biometria não cadastrada');
        return true;
    }

    const resultado = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Confirme sua identidade',
        cancelLabel: 'Cancelar',
    });

    if (resultado.success) {
        console.log('Acesso liberado!');
        return true;
    } else {
        console.log('Autenticação não realizada.');
        return false;
    }
}