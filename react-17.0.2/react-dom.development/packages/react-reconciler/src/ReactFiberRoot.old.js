
  function FiberRootNode(containerInfo, tag, hydrate) {
    this.tag = tag;
    this.containerInfo = containerInfo; // root特有的
    this.pendingChildren = null;
    this.current = null;
    this.pingCache = null;
    this.finishedWork = null;
    this.timeoutHandle = noTimeout; // noTimeout = -1
    this.context = null;
    this.pendingContext = null;
    this.hydrate = hydrate;
    this.callbackNode = null;
    this.callbackPriority = NoLanePriority; // NoLanePriority = 0
    this.eventTimes = createLaneMap(NoLanes); // NoLanes = 0
    this.expirationTimes = createLaneMap(NoTimestamp); // NoTimestamp = -1
    this.pendingLanes = NoLanes;
    this.suspendedLanes = NoLanes;
    this.pingedLanes = NoLanes;
    this.expiredLanes = NoLanes;
    this.mutableReadLanes = NoLanes;
    this.finishedLanes = NoLanes;
    this.entangledLanes = NoLanes;
    this.entanglements = createLaneMap(NoLanes);

    {
      this.mutableSourceEagerHydrationData = null;
    }

    {
      // id 0++ threadIDCounter
      this.interactionThreadID = unstable_getThreadID();
      this.memoizedInteractions = new Set(); // 相互作用 相互影响
      this.pendingInteractionMap = new Map(); // pending
    }

    {
      switch (tag) {
        case BlockingRoot: // 1
          this._debugRootType = 'createBlockingRoot()';
          break;

        case ConcurrentRoot: // 2
          this._debugRootType = 'createRoot()';
          break;

        case LegacyRoot: // 0
          this._debugRootType = 'createLegacyRoot()';
          break;
      }
    }
  }

  // containerInfo = document.queryElementById('app')
  function createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks) {
    var root = new FiberRootNode(containerInfo, tag, hydrate);
    // stateNode is any.


    var uninitializedFiber = createHostRootFiber(tag);
    root.current = uninitializedFiber; // current指向另一个fiber
    uninitializedFiber.stateNode = root; // stateNode回头指向正在工作的fiber
    initializeUpdateQueue(uninitializedFiber);
    // 初始化的内容
    // var queue = {
    //   baseState: fiber.memoizedState,
    //   firstBaseUpdate: null,
    //   lastBaseUpdate: null,
    //   shared: {
    //     pending: null
    //   },
    //   effects: null
    // };
    // fiber.updateQueue = queue;
    return root;
  }