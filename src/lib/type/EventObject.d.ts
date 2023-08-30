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
  isAllDay?: boolean;
  isDragable?: boolean;
  isResizable?: boolean;
  isDisabled?: boolean;
  isDeleted?: boolean;
  startTime?: number;
  endTime?: number;
  bg_color?: string;
  custom_class?: string;
  element?: ReactNode;

  // Add other properties as needed
}

export interface EventObjectInput {
  sc_app__id?: number | string;
  startDate: string;
  endDate: string;
  id?: string | number;
  width?: number;
  title?: string;
  description?: string;
  color?: string;
  textColor?: string;
  isAllDay?: boolean;
  isDragable?: boolean;
  isResizable?: boolean;
  isDisabled?: boolean;
  isDeleted?: boolean;
  startTime: string;
  endTime: string;
  bg_color?: string;
  custom_class?: string;
  element?: ReactNode;
  editable?: boolean;
  deletable?: boolean;
  draggable?: boolean;

  // Add other properties as needed
}
