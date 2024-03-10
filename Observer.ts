// 定义观察者接口
interface Observer {
  update(data: any): void;
}

// 定义发布者接口
interface Observable {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(data: any): void;
}

// 实现观察者
class ConcreteObserver implements Observer {
  update(data: any): void {
    console.log(`ConcreteObserver received update with data: ${data}`);
    // 进行观察者自身的处理逻辑
  }
}

// 实现具体的发布者 类
class ConcreteObservable implements Observable {
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(data: any): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

// 示例使用
const observable = new ConcreteObservable();
const observer1 = new ConcreteObserver();
const observer2 = new ConcreteObserver();

observable.addObserver(observer1);
observable.addObserver(observer2);

observable.notifyObservers("Hello, observers!");
observable.notifyObservers("这是第二条信息");

// 输出：
// ConcreteObserver received update with data: Hello, observers!
// ConcreteObserver received update with data: Hello, observers!
