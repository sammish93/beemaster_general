//TODO: Expo Camera does not work on 'web', but works fine with mobile.
//See PermissionSwitch for my solution with api (for web) and react native permission(for ios/android).

/* using expo, but web crashes: 
const Mobile = () => {
    const [cameraPermission, setCameraPermission] = useState<PermissionStatus | null>(null);
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        checkAndRequestCameraPermission();
    }, []);

    const checkAndRequestCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(status);
        setIsEnabled(status === 'granted');
    };

    const handleSwitchChange = async (newValue: boolean) => {
        if (newValue) {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setCameraPermission(status);
            setIsEnabled(status === 'granted');
        } else {
            setCameraPermission('denied');
            setIsEnabled(false);
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Camera Permission: {cameraPermission}</Text>
            <Switch
                onValueChange={handleSwitchChange}
                value={isEnabled}
            />
        </View>
    );
};
*/


