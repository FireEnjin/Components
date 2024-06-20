import {
  Component,
  ComponentInterface,
  Method,
  Prop,
  State,
  h,
  Host,
} from "@stencil/core";
import tsKanban from "./tsKanban";

export interface Board {
  id?: string;
  title: string;
  class?: string;
  dragTo?: string[];
  item: {
    id?: string;
    title: string;
    class?: string[];
    [key: string]: any;
  }[];
  [key: string]: any;
}

@Component({
  tag: "fireenjin-kanban",
  styleUrl: "kanban.css",
})
export class Kanban implements ComponentInterface {
  kanban: any;

  @Prop() boardId = "fireenjin-kanban";
  @Prop() options?: {
    element?: string;
    gutter?: string;
    boards?: Board[];
    widthBoard?: string;
    responsivePercentage?: boolean;
    dragItems?: boolean;
    dragBoards?: boolean;
    itemAddOptions?: {
      enabled?: boolean;
      content?: string;
      class?: string;
      footer?: boolean | string;
    };
    itemHandleOptions?: {
      enabled?: boolean;
      handleClass?: string;
      customCssHandler?: string;
      customCssIconHandler?: string;
      customHandler?: string;
    };
    click?: (el: any) => void;
    context?: (el: any, event: any) => void;
    dragEl?: (el: any, source: any) => void;
    dragendEl?: (el: any) => void;
    dropEl?: (el: any, target: any, source: any, sibling: any) => void;
    dragBoard?: (el: any, source: any) => void;
    dragendBoard?: (el: any) => void;
    buttonClick?: (el: any, boardId: any) => void;
    propagationHandlers?: string[];
  };
  @Prop() disableResponsive = false;

  @State() boards?: Board[];

  @Method()
  async addElement(boardId: string, element: any, position?: number) {
    return this.kanban.addElement(boardId, element, position);
  }

  @Method()
  async addForm(boardId: string, formItem?: any) {
    return this.kanban.addForm(boardId, formItem);
  }

  @Method()
  async addBoards(boards: Board[]) {
    return this.kanban.addBoards(boards);
  }

  @Method()
  async findElement(id: string) {
    return this.kanban.findElement(id);
  }

  @Method()
  async replaceElement(id: string, element: any) {
    return this.kanban.replaceElement(id, element);
  }

  @Method()
  async getParentBoardID(id: string) {
    return this.kanban.getParentBoardID(id);
  }

  @Method()
  async findBoard(id: string) {
    return this.kanban.findBoard(id);
  }

  @Method()
  async getBoardElements(id: string) {
    return this.kanban.getBoardElements(id);
  }

  @Method()
  async removeElement(id: string) {
    return this.kanban.removeElement(id);
  }

  @Method()
  async removeBoard(id: string) {
    return this.kanban.removeBoard(id);
  }

  @Method()
  async getKanban() {
    return this.kanban;
  }

  async componentDidLoad() {
    this.kanban = new tsKanban({
      element: `#${this.boardId}`,
      responsivePercentage: !this.disableResponsive,
      ...(this.options || {}),
      boards: this.boards || this.options?.boards || [],
    });
  }

  render() {
    return <Host id={this.boardId} />;
  }
}
