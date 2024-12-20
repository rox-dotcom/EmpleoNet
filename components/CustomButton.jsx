import { TouchableOpacity, Text} from 'react-native'


const CustomButton = ({title, handlePress,containerStyles,
    textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-secondary-300 rounded-xl min-h-[62px] 
    justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50':''}`}
    disabled={isLoading} //no te deja presionar el boton una vez que esta cargando
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton