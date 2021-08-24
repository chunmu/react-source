  // 这边的target 一般是#root-app 或者是document
  
  // 冒泡阶段处理 越底层越先处理
  function addEventBubbleListener(target, eventType, listener) {
    target.addEventListener(eventType, listener, false);
    return listener;
  }

  // 捕获阶段处理 越上层越快执行
  function addEventCaptureListener(target, eventType, listener) {
    target.addEventListener(eventType, listener, true);
    return listener;
  }
  // 构造了代理事件的处理 冒泡阶段捕获 且passive 不是互相矛盾吗
  function addEventCaptureListenerWithPassiveFlag(target, eventType, listener, passive) {
    target.addEventListener(eventType, listener, {
      capture: true,
      passive: passive
    });
    return listener;
  }
  // passive的处理
  function addEventBubbleListenerWithPassiveFlag(target, eventType, listener, passive) {
    target.addEventListener(eventType, listener, {
      passive: passive
    });
    return listener;
  }