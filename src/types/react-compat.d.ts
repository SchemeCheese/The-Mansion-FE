/* eslint-disable react/no-typos */
import 'react';

declare module 'react' {
  interface DOMAttributes<T> {
    // Compatibility shim for libraries typed against older React DOM event keys.
    onPointerEnterCapture?: PointerEventHandler<T> | undefined;
    onPointerLeaveCapture?: PointerEventHandler<T> | undefined;
  }
}
