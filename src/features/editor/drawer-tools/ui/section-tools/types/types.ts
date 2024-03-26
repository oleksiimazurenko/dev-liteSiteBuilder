export type PanelParams = {
  isAbsolute: boolean | undefined;
  positionY:  string | undefined ;
  lastPositionY: 'bottom' | 'top' | 'initial';
  lastRectTopPanel: number | undefined;
}

export type Rect = {
  top: number;
  bottom: number;
}