import { Link } from 'expo-router';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function HomeScreen() {
    return (
        <ImageBackground
            source={require('../assets/images/fondo_app.jpg')}
            style={globalStyles.background}
            resizeMode="cover"
        >
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>QUIZLEDGE</Text>

                <Link href="/quiz" asChild>
                    <TouchableOpacity style={globalStyles.button}>
                        <Text style={globalStyles.buttonText}>Comenzar Quiz</Text>
                    </TouchableOpacity>
                </Link>

                <Link href="/ranking" asChild>
                    <TouchableOpacity style={globalStyles.button}>
                        <Text style={globalStyles.buttonText}>Ver Ranking</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </ImageBackground>
    );
}