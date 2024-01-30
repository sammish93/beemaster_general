import { action, makeAutoObservable, observable } from "mobx";

// Ensure that the view model is singleton and observable by wrapping application in a <Provider>
// (see app/_layout.tsx), and sending the view model to be available throughout the whole app.
// You can then use the view model in a functional component  like this:
// const ExampleScreen = () => {
// const { exampleViewModel } = useContext(MobXProviderContext);
//   return (
//    <View style={styles.container}>
//      <Text style={styles.title}>{exampleViewModel.testString}</Text>
//       ... etc

// NOTE: Very important that the view model is exported like the example shown here
// and the functional component accessing the view model is exported like so:
// export default observer(TabTwoScreen);

// This ensures that the view model is singleton and a change in state is updated on each page.
// Also remember to annotate your class components with either @observable or @action.

class ExampleViewModel {
    constructor() {
        makeAutoObservable(this)
    }

    @observable public testString = "String from ViewModel";

    @action public setTestString = (val: string) : void => {
        this.testString = val;
    }

    @action public handleButtonPress = (): void => {
        this.setTestString("Overwritten using ViewModel")
    }
    
}

export default new ExampleViewModel()