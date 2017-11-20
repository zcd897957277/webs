function Todo(id){
        this.ref = document.getElementById(id);
        this.itemsWrap = this.ref.querySelector('.todo-items');
        this.activeNumWrap = this.ref.querySelector('.active-num');
        this.completeWrap = this.ref.querySelector('.complete-wrap');
        this.completeNumWrap = this.ref.querySelector('.complete-num');
        this.All = this.ref.querySelector('.switch-allcurrent');
        this.Active = this.ref.querySelector('.switch-active');
        this.comp = this.ref.querySelector('.switchcomplete');
        this.items = {};
        this.index = 0;
        this.init();

     };
     Todo.prototype.init = function(){  //对对象初始化工作
        var _todo = this;
        //添加绑定item事件处理程序
        var input = this.ref.querySelector('input');
        input.addEventListener('keydown',function(e){
            if( e.keyCode !== 13 || input.value.trim() === '' ) return;
             _todo.add(this.value);
             this.value = '';
        },false);

        //切换所有item状态
        this.ref.querySelector('.todo-toggle').addEventListener('click',function(){
               var items = _todo.items;
                if(this.className.indexOf('complete') === -1){ //对类名进行检索,complete没有检查到位置 就返回-1;
                       for(var id in items){
                          if(!items[id].isActive) continue;
                               items[id].switchStatus();
                       };
                       this.className += ' complete';
                }else{
                    for(var id in items){
                          if(items[id].isActive) continue;
                          items[id].switchStatus();
                    };
                    this.className = this.className.replace('complete','');
                }
        },false);

  var switchWrap = this.ref.querySelector('.todo-filters');
  var switches = switchWrap.querySelectorAll('.switch');

  switchWrap.addEventListener('click', function(e){
    var className = e.target.className;
    console.log(className);

    if(!className.indexOf('switch') === -1) return;
    for(var i = switches.length - 1; i >= 0; i--){
      switches[i].className = switches[i].className.replace(' current', '');
    }

    var view = 'all';

    if(className.indexOf('active') > -1){
      view = 'active';
    }else if(className.indexOf('complete') > -1){
      view = 'complete';
    }

    _todo.switchView(view);

    if(e.target.className.indexOf('current') === -1){
      e.target.className += ' current';
    }
  }, false);

     };

     Todo.prototype.add = function(text){
        var id = 'item' + this.index++;
        var newItem = new TodoItem(id,text,this);
        this.items[id] = newItem;
        this.refresh();
     };

     Todo.prototype.remove = function(item_dom){
          delete this.items[item_dom.id];
          this.itemsWrap.removeChild(item_dom);
          this.refresh();
     };

     Todo.prototype.switchView = function(view){
            if(view === 'all'){
              for(var id in this.items){
                  this.items[id].show();
               }
            }else{
             var activeShow = (view === 'active' ? true : false);
              for(var id in this.items){
                if(this.items[id].isActive === activeShow){
                   this.items[id].show();
            }else{
                   this.items[id].hide();
      }
    }
  }
     };

     Todo.prototype.refresh = function(){
           var items = this.items;

           var activeNum = 0,
                 completeNum = 0;
            for(var key in items){
                  if(items[key].isActive){
                      activeNum++;
                  }else{
                      completeNum++;
                  }
            };

            this.activeNumWrap.innerHTML = activeNum;
            this.completeNumWrap.innerHTML = completeNum;
            if(completeNum === 0){
                 this.completeWrap.style.display = 'none';
            }else{
                 this.completeWrap.style.display = 'inline';
            };
     };


     function TodoItem(id,test,app){
          this.ref = null;
          this.id = id;
          this.test = test;
          this.app = app;
          this.isActive = true;
          this.init();
     };

     TodoItem.prototype.init = function(){
           //新建dom节点
           var ele = document.createElement('li');
           ele.className = 'todo-item';
           ele.id = this.id;
           ele.innerHTML += '<div class="status"></div>';
           ele.innerHTML += '<span class="item-text">'+ this.test +'</span>';
           ele.innerHTML += '<div class="delete"></div>';
           this.ref = ele;

           //插入对应dom
           var wrap = this.app.itemsWrap;
           wrap.insertBefore(ele,wrap.firstChild);

           var _todo = this.app;
           var _todoItem = this;
           //绑定删除事件
           ele.querySelector('.delete').addEventListener('click',function(e){
           _todo.remove(ele);
           },false);

           //绑定改变状态事件
           ele.querySelector('.status').addEventListener('click',function(){
                _todoItem.switchStatus();
           },false);
     };

     TodoItem.prototype.switchStatus = function(){
            this.isActive = !this.isActive;
            if(this.isActive){
                 this.ref.className = this.ref.className.replace('done','');
            }else{
                 this.ref.className += ' done';
            }
            this.app.refresh();
     };

     TodoItem.prototype.hide = function(){
         if(this.ref.style.display !== 'none'){
             this.ref.style.display = 'none';
         }
     };

     TodoItem.prototype.show = function(){
             if(this.ref.style.display === 'none'){
                this.ref.style.display = 'block';
             }
     }




