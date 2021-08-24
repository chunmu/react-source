  var allNativeEvents = new Set();
  /**
   * Mapping from registration name to event name
   */


  var registrationNameDependencies = {};
  /**
   * Mapping from lowercase registration names to the properly cased version,
   * used to warn in the case of missing event handlers. Available
   * only in true.
   * @type {Object}
   */

  var possibleRegistrationNames =  {} ; // Trust the developer to only use possibleRegistrationNames in true

  function registerTwoPhaseEvent(registrationName, dependencies) {
    // registrationName = 'onClick' dependencies = ['click']
    registerDirectEvent(registrationName, dependencies);
    registerDirectEvent(registrationName + 'Capture', dependencies);
  }
  // registerDirectEvent('onMouseEnter', ['mouseout', 'mouseover']);
  function registerDirectEvent(registrationName, dependencies) {
    {
      if (registrationNameDependencies[registrationName]) {
        error('EventRegistry: More than one plugin attempted to publish the same ' + 'registration name, `%s`.', registrationName);
      }
    }
    // {onClick: ['click']} {{onClickCapture: ['click']}}
    registrationNameDependencies[registrationName] = dependencies;

    {
      // {onclick: onClick} {onClickCapture: onClick}
      var lowerCasedName = registrationName.toLowerCase();
      possibleRegistrationNames[lowerCasedName] = registrationName;

      // 浏览器api的实现
      // 这真的是设计这吃啥长大的   本来都toLowerCase处理就好的   非要跑出来这种不统一的处理
      // 我认为这个设计有问题 名称不怕长 要有迹可循
      if (registrationName === 'onDoubleClick') {
        possibleRegistrationNames.ondblclick = registrationName;
      }
    }

    for (var i = 0; i < dependencies.length; i++) {
      allNativeEvents.add(dependencies[i]); // 收集所有用户用到的原生事件
      // allNativeEvents.add('click')
    }
  }