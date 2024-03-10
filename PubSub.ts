type EventCallback = (...args: any[]) => void;
type MessageType = string;

class EventBus {
  private stores: Record<string, EventCallback[]> = {};

  constructor() {
    this.stores = this.stores || {}; //{key:Array}
  }

  on(type: MessageType, callback: EventCallback): void {
    this.stores[type]
      ? this.stores[type].push(callback)
      : (this.stores[type] = [callback]);
  }

  off(type: MessageType, callback: EventCallback): void {
    const callbacks = this.stores[type];
    if (callbacks) {
      this.stores[type] = callbacks.filter((fn) => fn !== callback);
    }
  }

  emit(type: MessageType, ...args: any[]): void {
    const callbacks = this.stores[type];
    if (callbacks) {
      callbacks.forEach((callback) => callback(...args));
    }
  }
}

const eventBus = new EventBus();

const callback = (data: any) => {
  console.log(data);
};
eventBus.on("event", callback);

eventBus.emit("event", "发送的消息: 11");

// eventBus.off("event", callback);
// eventBus.emit("event", "发送的消息: 22");
