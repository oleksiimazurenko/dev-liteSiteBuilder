export type PanelParams = {
  isAbsolute: boolean | undefined;
  positionY:  string | undefined ;
  lastPositionY: 'bottom' | 'top' | 'initial';
}

export type Rect = {
  top: number;
  bottom: number;
}