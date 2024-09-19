import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Device } from 'react-native-ble-plx';

import { BleDevice } from './components/BleDevice';
import Button from './components/Button';
import { BLEService } from './services/BLEService';
import { cloneDeep } from './utils/cloneDeep';

type DeviceExtendedByUpdateTime = Device & { updateTimestamp: number };

const MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS = 5000;

export function BluetoothTestScreen({ navigation }: any) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [foundDevices, setFoundDevices] = useState<DeviceExtendedByUpdateTime[]>([]);

  const addFoundDevice = (device: Device) =>
    setFoundDevices((prevState) => {
      if (!isFoundDeviceUpdateNecessary(prevState, device)) {
        return prevState;
      }
      // deep clone
      const nextState = cloneDeep(prevState);
      const extendedDevice: DeviceExtendedByUpdateTime = {
        ...device,
        updateTimestamp: Date.now() + MIN_TIME_BEFORE_UPDATE_IN_MILLISECONDS,
      } as DeviceExtendedByUpdateTime;

      const indexToReplace = nextState.findIndex((currentDevice) => currentDevice.id === device.id);
      if (indexToReplace === -1) {
        return nextState.concat(extendedDevice);
      }
      nextState[indexToReplace] = extendedDevice;
      return nextState;
    });

  const isFoundDeviceUpdateNecessary = (
    currentDevices: DeviceExtendedByUpdateTime[],
    updatedDevice: Device
  ) => {
    const currentDevice = currentDevices.find(({ id }) => updatedDevice.id === id);
    if (!currentDevice) {
      return true;
    }
    return currentDevice.updateTimestamp < Date.now();
  };

  const onConnectSuccess = () => {
    navigation.navigate('DEVICE_DETAILS_SCREEN');
    setIsConnecting(false);
  };

  const onConnectFail = () => {
    setIsConnecting(false);
  };

  const deviceRender = (device: Device) => (
    <BleDevice
      onPress={(pickedDevice) => {
        setIsConnecting(true);
        BLEService.connectToDevice(pickedDevice.id).then(onConnectSuccess).catch(onConnectFail);
      }}
      key={device.id}
      device={device}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {isConnecting && <Text style={{ fontSize: 30 }}>Connecting</Text>}

      <Button
        onPress={() => {
          console.log('looking...');

          setFoundDevices([]);
          BLEService.initializeBLE().then(() => BLEService.scanDevices(addFoundDevice, null, true));
        }}>
        Look for devices
      </Button>
      <Button onPress={BLEService.requestBluetoothPermission}>Ask for permissions</Button>

      <FlatList
        style={{ flex: 1 }}
        data={foundDevices.filter((dvc) => dvc?.isConnectable)}
        renderItem={({ item }) => deviceRender(item)}
        keyExtractor={(device) => device.id}
      />
    </View>
  );
}
