export interface EventObject {
  sc_app__id?: number | string;
  startDate?: string | number;
  endDate?: string | number;

  left?: string;
  top?: string;
  width?: number;
  title?: string;
  description?: string;
  color?: string;
  textColor?: string;

  isDragable: boolean;
  isResizable: boolean;
  isDisabled?: boolean;
  isDeleted?: boolean;
  startTime?: number;
  endTime?: number;
  bg_color?: string;
  custom_class?: string;
  element?: ReactNode;
  userId?: number | string;
  
  
  
  // Add other properties as needed
}

export interface EventObjectInput {
  sc_app__id?: number | string;
  startDate: string;
  endDate: string;
  id?: string | number;
  title?: string;
  description?: string;
  color?: string;
  textColor?: string;
  draggable?: boolean;
  resizable?: boolean;
  startTime: string;
  endTime: string;
  bg_color?: string;
  custom_class?: string;
  element?: ReactNode;
  deletable?: boolean;
  editable?: boolean;
  userId?: number | string;
  extraData?: object;
}
