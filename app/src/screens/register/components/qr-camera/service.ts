import { Permission, PermissionsAndroid } from 'react-native';

import { PermissionStatus } from './permission-status.enum';

const ANDROID_CAMERA_PERMISSION: Permission = 'android.permission.CAMERA';

export const getCameraPermissionStatus = async () => {
  const permissionGranted = await PermissionsAndroid.check(
    ANDROID_CAMERA_PERMISSION,
  );

  if (!permissionGranted) {
    return (await PermissionsAndroid.request(
      ANDROID_CAMERA_PERMISSION,
    )) as PermissionStatus;
  }
  return permissionGranted ? PermissionStatus.Granted : PermissionStatus.Denied;
};
