import React from 'react';
import { Pressable, Text } from 'react-native';
import { Device } from 'react-native-ble-plx';

export type BleDeviceProps = {
  onPress: (device: Device) => void;
  device: Device;
};

export function BleDevice({ device, onPress }: BleDeviceProps) {
  const isConnectableInfoValueIsUnavailable = typeof device.isConnectable !== 'boolean';
  const isConnectableValue = device.isConnectable ? 'true' : 'false';
  const parsedIsConnectable = isConnectableInfoValueIsUnavailable ? '-' : isConnectableValue;

  return (
    <Pressable onPress={() => onPress(device)}>
      <Text>{device.name}</Text>
      <Text>{device.localName}</Text>
      <Text>{device.id}</Text>
      <Text>{device.manufacturerData}</Text>
      <Text>{device.rawScanRecord}</Text>
      <Text>{parsedIsConnectable}</Text>
      <Text>{device.mtu.toString()}</Text>
      <Text>{device.rssi}</Text>
    </Pressable>
  );
}
