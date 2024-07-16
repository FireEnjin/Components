import dragula from "dragula";

export default class tsKanban {
  __DEFAULT_ITEM_HANDLE_OPTIONS: any;
  __DEFAULT_ITEM_ADD_OPTIONS: any;
  _disallowedItemProperties: any;
  element: any;
  container: HTMLElement;
  boardContainer: any[];
  handlers: any[];
  dragula: dragula.Dragula;
  drake: any;
  drakeBoard: any;
  itemAddOptions: any;
  itemHandleOptions: any;
  columnWidth = 250;
  columnPadding = 20;
  lastSource: any;
  options: {
    itemHandleOptions?: any;
    dragItems?: boolean;
    dragBoards?: boolean;
    element?: string;
    gutter?: string;
    widthBoard?: string;
    boards?: any[];
    itemAddOptions?: any;
    dragEl?: (el, source) => any;
    dragendEl?: (el) => any;
    dropEl?: (el, target, source, sibling) => any;
    dragBoard?: (el, source) => any;
    dragendBoard?: (el) => any;
    dropBoard?: (el, target, source, sibling) => any;
    click?: (el) => any;
    context?: (el, e) => any;
    buttonClick?: (el, boardId?) => any;
    propagationHandlers?: any[];
  };
  constructor(options = {}) {
    this.__DEFAULT_ITEM_HANDLE_OPTIONS = {
      enabled: false,
    };
    this.__DEFAULT_ITEM_ADD_OPTIONS = {
      enabled: false,
    };
    this._disallowedItemProperties = [
      "id",
      "title",
      "click",
      "context",
      "drag",
      "dragend",
      "drop",
      "order",
    ];
    this.boardContainer = [];
    this.handlers = [];
    this.dragula = dragula;
    this.itemAddOptions = this.__DEFAULT_ITEM_ADD_OPTIONS;
    this.itemHandleOptions = this.__DEFAULT_ITEM_HANDLE_OPTIONS;

    const defaults = {
      element: "",
      gutter: "15px",
      widthBoard: `${this.columnWidth}px`,
      boards: [],
      dragBoards: true,
      dragItems: true,
      itemAddOptions: this.__DEFAULT_ITEM_ADD_OPTIONS,
      itemHandleOptions: this.__DEFAULT_ITEM_HANDLE_OPTIONS,
      dragEl: (_el, _source) => {},
      dragendEl: (_el) => {},
      dropEl: (_el, _target, _source, _sibling) => {},
      dragBoard: (_el, _source) => {},
      dragendBoard: (_el) => {},
      dropBoard: (_el, _target, _source, _sibling) => {},
      click: (_el) => {},
      context: (_el, _e) => {},
      buttonClick: (_el, _boardId) => {},
      propagationHandlers: [],
    };

    this.options = { ...defaults, ...options };

    this.init();
  }

  __getCanMove(handle) {
    if (!this.options.itemHandleOptions.enabled) {
      return !!this.options.dragItems;
    }

    if (this.options.itemHandleOptions.handleClass) {
      return handle.classList.contains(
        this.options.itemHandleOptions.handleClass,
      );
    }

    return handle.classList.contains("item_handle");
  }

  init() {
    // Set initial boards
    this.__setBoard();

    // Init Drag Board
    this.drakeBoard = this.dragula([this.container], {
      moves: (_el, _source, handle, _sibling) => {
        if (!this.options.dragBoards) return false;
        return (
          handle.classList.contains("kanban-board-header") ||
          handle.classList.contains("kanban-title-board")
        );
      },
      accepts: (_el, target, _source, _sibling) => {
        return target.classList.contains("kanban-container");
      },
      revertOnSpill: true,
      direction: "horizontal",
    })
      .on("drag", (el: any, source) => {
        el.classList.add("is-moving");
        this.options.dragBoard(el, source);
        if (typeof el.dragfn === "function") el.dragfn(el, source);
      })
      .on("dragend", (el: any) => {
        this.__updateBoardsOrder();
        el.classList.remove("is-moving");
        this.options.dragendBoard(el);
        if (typeof el.dragendfn === "function") el.dragendfn(el);
      })
      .on("drop", (el: any, target, source, sibling) => {
        el.classList.remove("is-moving");
        this.options.dropBoard(el, target, source, sibling);
        if (typeof el.dropfn === "function")
          el.dropfn(el, target, source, sibling);
      });

    // Init Drag Item
    this.drake = this.dragula(this.boardContainer, {
      moves: (_el, _source, handle) => {
        return this.__getCanMove(handle);
      },
      revertOnSpill: true,
    })
      .on("cancel", () => {
        this.enableAllBoards();
      })
      .on("over", (_el: any, source: any) => {
        if (this.lastSource === source) return;
        this.lastSource = source;
        source.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      })
      .on("drag", (el: any, source: any) => {
        const elClass = el.getAttribute("class");
        if (elClass !== "" && elClass.includes("not-draggable")) {
          this.drake.cancel(true);
          return;
        }

        el.classList.add("is-moving");

        this.options.dragEl(el, source);

        const boardJSON = this.__findBoardJSON(source.parentNode.dataset.id);
        if (boardJSON.dragTo !== undefined) {
          this.options.boards.forEach((board) => {
            if (
              boardJSON.dragTo.indexOf(board.id) === -1 &&
              board.id !== source.parentNode.dataset.id
            ) {
              this.findBoard(board.id).classList.add("disabled-board");
            }
          });
        }

        if (el !== null && typeof el.dragfn === "function")
          el.dragfn(el, source);
      })
      .on("dragend", (el: any) => {
        this.options.dragendEl(el);
        if (el !== null && typeof el.dragendfn === "function") el.dragendfn(el);
      })
      .on("drop", (el: any, target: any, source: any, sibling) => {
        this.enableAllBoards();

        const boardJSON = this.__findBoardJSON(source.parentNode.dataset.id);
        if (boardJSON.dragTo !== undefined) {
          if (
            boardJSON.dragTo.indexOf(target.parentNode.dataset.id) === -1 &&
            target.parentNode.dataset.id !== source.parentNode.dataset.id
          ) {
            this.drake.cancel(true);
          }
        }
        if (el !== null) {
          const result = this.options.dropEl(el, target, source, sibling);
          if (result === false) {
            this.drake.cancel(true);
          }
          el.classList.remove("is-moving");
          if (typeof el.dropfn === "function")
            el.dropfn(el, target, source, sibling);
        }
      });
  }

  enableAllBoards() {
    const allB = document.querySelectorAll(".kanban-board");
    if (allB.length > 0 && allB !== undefined) {
      for (let i = 0; i < allB.length; i++) {
        allB[i].classList.remove("disabled-board");
      }
    }
  }

  addElement(boardID, element, position = -1) {
    const board = this.element.querySelector(
      `[data-id="${boardID}"] .kanban-drag`,
    );
    const refElement = board.childNodes[position];
    const nodeItem: any = document.createElement("div");
    nodeItem.classList.add("kanban-item");
    if (element.id !== undefined && element.id !== "") {
      nodeItem.setAttribute("data-eid", element.id);
    }
    if (element.class && Array.isArray(element.class)) {
      element.class.forEach((cl) => {
        nodeItem.classList.add(cl);
      });
    }
    nodeItem.innerHTML = this.__buildItemCard(element);
    // Add functions
    nodeItem.clickfn = element.click;
    nodeItem.contextfn = element.context;
    nodeItem.dragfn = element.drag;
    nodeItem.dragendfn = element.dragend;
    nodeItem.dropfn = element.drop;
    this.__appendCustomProperties(nodeItem, element);
    this.__onclickHandler(nodeItem);
    this.__onContextHandler(nodeItem);
    if (this.options.itemHandleOptions.enabled) {
      nodeItem.style.cursor = "default";
    }
    board.insertBefore(nodeItem, refElement);
    return this;
  }

  addForm(boardID, formItem) {
    const board = this.element.querySelector(
      `[data-id="${boardID}"] .kanban-drag`,
    );
    const _attribute = formItem.getAttribute("class");
    formItem.setAttribute("class", `${_attribute} not-draggable`);
    board.appendChild(formItem);
    return this;
  }

  addBoards(boards, isInit) {
    const addButton = this.options.itemAddOptions.enabled;
    const buttonContent = this.options.itemAddOptions.content;
    const buttonClass = this.options.itemAddOptions.class;
    const buttonFooter = this.options.itemAddOptions.footer;

    boards.forEach((board, _boardkey) => {
      if (!isInit) {
        this.options.boards.push(board);
      }

      const boardNode = document.createElement("div");
      boardNode.dataset.id = board.id;
      boardNode.dataset.order = `${this.container.childNodes.length + 1}`;
      boardNode.classList.add("kanban-board");
      boardNode.style.minWidth = this.options.widthBoard;
      boardNode.style.marginLeft = this.options.gutter;
      boardNode.style.marginRight = this.options.gutter;

      const headerBoard = document.createElement("header");
      const allClasses = board.class ? board.class.split(",") : [];
      headerBoard.classList.add("kanban-board-header");
      allClasses.forEach((value) => {
        value = value.replace(/^\s+/g, ""); // ltrim
        headerBoard.classList.add(value);
      });

      headerBoard.innerHTML = `<div class="kanban-title-board">${board.title}</div>`;
      boardNode.appendChild(headerBoard);

      const contentBoard = document.createElement("main");
      contentBoard.classList.add("kanban-drag");
      if (board.bodyClass !== undefined && board.bodyClass !== "") {
        const bodyClasses = board.bodyClass.split(",");
        bodyClasses.forEach((value) => {
          value = value.replace(/^\s+/g, ""); // ltrim
          contentBoard.classList.add(value);
        });
      }
      if (board.item) {
        board.item.forEach((item) => {
          const nodeItem: any = document.createElement("div");
          nodeItem.classList.add("kanban-item");
          if (item.id !== undefined && item.id !== "") {
            nodeItem.dataset.eid = item.id;
          }
          if (item.class && Array.isArray(item.class)) {
            item.class.forEach((cl) => {
              nodeItem.classList.add(cl);
            });
          }
          nodeItem.innerHTML = this.__buildItemCard(item);
          // Add functions
          nodeItem.clickfn = item.click;
          nodeItem.contextfn = item.context;
          nodeItem.dragfn = item.drag;
          nodeItem.dragendfn = item.dragend;
          nodeItem.dropfn = item.drop;
          this.__appendCustomProperties(nodeItem, item);
          this.__onclickHandler(nodeItem);
          this.__onContextHandler(nodeItem);
          if (this.options.itemHandleOptions.enabled) {
            nodeItem.style.cursor = "default";
          }
          contentBoard.appendChild(nodeItem);
        });
      }

      if (addButton) {
        const footerBoard = document.createElement("footer");
        footerBoard.classList.add("kanban-footer");
        const btn = document.createElement("button");
        const btnText = document.createTextNode(buttonContent);
        btn.classList.add(buttonClass);
        btn.appendChild(btnText);
        // Button on click
        btn.onclick = (e) => {
          this.options.buttonClick(e.target, board.id);
        };
        footerBoard.appendChild(btn);
        if (buttonFooter) {
          boardNode.appendChild(contentBoard);
          boardNode.appendChild(footerBoard);
        } else {
          boardNode.appendChild(footerBoard);
          boardNode.appendChild(contentBoard);
        }
      } else {
        boardNode.appendChild(contentBoard);
      }

      this.container.appendChild(boardNode);
      this.boardContainer.push(contentBoard);
    });

    return this;
  }

  findBoard(id) {
    const el = this.container.querySelector(`[data-id="${id}"]`);
    return el;
  }

  getBoardElements(id) {
    const board = this.findBoard(id);
    const boardElements = [];
    if (board) {
      const elements = board.querySelectorAll(".kanban-item");
      if (elements.length > 0) {
        elements.forEach((element) => {
          boardElements.push(element);
        });
      }
    }
    return boardElements;
  }

  removeElement(boardID, elementID) {
    const board = this.element.querySelector(
      `[data-id="${boardID}"] .kanban-drag`,
    );
    const el = board.querySelector(`[data-eid="${elementID}"]`);
    if (el) {
      el.remove();
    }
    return this;
  }

  removeBoard(boardID) {
    const board = this.element.querySelector(`[data-id="${boardID}"]`);
    if (board) {
      board.remove();
    }
    this.options.boards.map((board, index) => {
      if (board.id === boardID) {
        this.options.boards.splice(index, 1);
      }
    });
    return this;
  }

  onButtonClick(el) {
    this.options.buttonClick(el);
  }

  __buildItemCard(item) {
    return item?.html || item?.title;
  }

  __onclickHandler(nodeItem) {
    nodeItem.addEventListener("click", (e) => {
      e.preventDefault();
      this.options.click(nodeItem);
      if (nodeItem.clickfn !== undefined) nodeItem.clickfn(nodeItem);
    });
  }

  __onContextHandler(nodeItem) {
    nodeItem.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.options.context(nodeItem, e);
      if (nodeItem.contextfn !== undefined) nodeItem.contextfn(nodeItem);
    });
  }

  __findBoardJSON(id) {
    const el = this.options.boards.filter((board) => {
      return board.id === id;
    });
    return el[0];
  }

  __setBoard() {
    this.element = document.querySelector(this.options.element);
    this.container = document.createElement("div");
    this.container.classList.add("kanban-container");
    this.element.appendChild(this.container);

    this.addBoards(this.options.boards, true);
  }

  __updateBoardsOrder() {
    const boards = this.container.childNodes;
    const _order = [];
    if (boards.length > 0) {
      boards.forEach((board: HTMLElement) => {
        _order.push(board.dataset.id);
      });
    }
    this.options.boards.map((board) => {
      board.order = _order.indexOf(board.id) + 1;
    });
  }

  __appendCustomProperties(el, targetObj) {
    Object.keys(targetObj).forEach((key) => {
      if (this._disallowedItemProperties.indexOf(key) === -1) {
        el.dataset[key] = targetObj[key];
      }
    });
  }
}
