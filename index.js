import $ from './libs/jqLite';
import style from './src/style';
import svg from './src/blockIcon';
import {MaskID, PanelID, Active} from './src/config';

const blockIcon = svg;

$(()=> {
  const config = {};

  const common = {
    formatDate(date, fmt){
      var o = {
        "M+": date.getMonth() + 1,                    //月份
        "d+": date.getDate(),                         //日
        "h+": date.getHours(),                        //小时
        "m+": date.getMinutes(),                      //分
        "s+": date.getSeconds(),                      //秒
        "q+": Math.floor((date.getMonth() + 3) / 3),  //季度
        "S": date.getMilliseconds()                   //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
      return fmt;
    },
    // 获取当前所在的位置，是贴吧列表，还是贴吧内容页
    getPosition(){
      const url = location.href;
      const postInside = /.*tieba.baidu.com\/p\/.*/ig;
      const postList = /.*tieba.baidu.com\/(f\?.*|[^p])/ig;
      return postInside.test(url) ? 'post' : postList.test(url) ? 'list' : null;
    },
    // 获取当前页的贴吧名
    getBarName(){
      return $(".card_title_fname").text().trim();
    },
    // 显示控制面板
    showPanel(){

      if ($(`#${MaskID}`).length) return;

      var fragment = document.createDocumentFragment();    // 创建文档碎片
      let $$div = document.createElement('div');           // 创建div
      let $mask = $($$div.cloneNode(false));               // 创建遮罩层
      let $panel = $($$div.cloneNode(false));              // 创建控制面板

      $mask.attr('id', MaskID);
      $panel.attr('id', PanelID);

      $panel.html(`
<h2 class="block-title">控制面板</h2>
<div class="block-container">
  
  <div class="block-menu">
    <ul>
      <li>配置</li>
      <li>屏蔽</li>
      <li>名单</li>
    </ul>
  </div>
  
  <div class="block-content">
  
    <session class="block-config">
      <h2>暂时没什么可配置的...</h2>
    </session>
    
    <session class="block-block">
    
      <form style="margin: 0 auto;">
        <div>
          <label>
            *贴吧ID
          </label>
          <input class="block-id form-control" type="text" placeholder="贴吧ID"/>
        </div>
        
        <div>
          <label>
            屏蔽原因
          </label>
          <input class="block-reason form-control" type="text" placeholder="屏蔽原因"/>
        </div>
        
        <div>
          <label>
            所在贴吧
          </label>
          <input class="block-bar form-control" type="text" placeholder="所在贴吧" value="${common.getBarName()}"/>
        </div>
  
        <input class="block-block-submit btn" type="button" value="提交"/>
      </form>
      
    </session>
    
    <session class="block-list">
    </session>
  </div>
  
  <div class="block-clear"></div>

</div>
      `);

      $mask.append($panel);

      // 关掉控制面板
      $mask.click((e)=> {
        if ($(e.target).attr('id') === MaskID) $mask.remove();
      });

      let $menu = $('.block-menu ul li', $mask[0]);
      let $session = $('.block-content session', $mask[0]);
      let $config = $session.eq(0);
      let $block = $session.eq(1);
      let $list = $session.eq(2);

      // init the panel
      $menu.eq(0).addClass(Active);
      $session.hide().eq(0).show();

      // get the block list
      $list
        .html(()=> {
          let GMList = GM_listValues();
          let list = [];

          for (let i = 0; i < GMList.length; i++) {
            list[i] = GM_getValue(GMList[i]);
          }

          let tableStr = '';

          list.forEach((v, i)=> {
            let time = '';
            if (v.date) {
              let date = new Date(v.date);
              time = common.formatDate(date, 'yyyy-MM-dd');
            }
            tableStr += `
            <tr>
              <td>${v.id}</td>
              <td>${v.bar}</td>
              <td>${v.reason}</td>
              <td>${time}</td>
              <td>
                <a class="block-remove btn" href="javascript:void(0)" block-id="${v.id}" list-index="${i}">移除</a>
              </td>
            </tr>
          `
          });

          return `
          <table>
            <thead>
              <tr>
                <th><b>贴吧ID</b></th>
                <th><b>所在贴吧</b></th>
                <th><b>屏蔽理由</b></th>
                <th><b>屏蔽时间</b></th>
                <th><b>操作</b></th>
              </tr>
            </thead>
            <tbody>
              ${tableStr}
            </tbody>
          </table>
        `;
        })
        .find('.block-remove')
        .click((e)=> {
          let $target = $(e.target);
          let index = +$target.attr('list-index');
          let blockID = $target.attr('block-id');

          $list.find('table>tbody>tr').each((ele)=> {
            if ($(ele).find('.block-remove').attr('block-id') === blockID) {
              ele.remove();
              GM_deleteValue(blockID);
            }
          });

        });

      // remove the panel
      $menu.click((e)=> {
        let index = $(e.target).index;
        $menu.removeClass(Active).eq(index).addClass(Active);
        $session.hide().eq(index).show();
        return false;
      });

      // block someone
      $block.find('.block-block-submit').click(e=> {

        let [$id,$bar,$reason] = ['id', 'bar', 'reason'].map(name=> {
          return $block.find(`.block-${name}`);
        });

        let [id,bar,reason] = [$id, $bar, $reason].map(input=> {
          return input.val();
        });

        if (!id) return;
        GM_setValue(id, {id, bar, reason, date: new Date()});
        $id.val('');
        $reason.val('');
      });

      fragment.appendChild($mask[0]);
      document.documentElement.appendChild(fragment)

    }
  };

  $(document).bind('keyup', (e)=> {
    if (e.keyCode === 120) common.showPanel();
  });

  GM_registerMenuCommand("控制面板", common.showPanel);

  style();

  let $icon = $(document.createElement("a")).html(blockIcon);

  let initCount = 0;
  const init = ()=> {
    if (common.getPosition() === 'post') {
      initCount++;
      $('.p_postlist .l_post').each((post)=> {
        let $name = $(post).find('.d_author ul.p_author li.d_name');
        if (!$name[0]) return;

        let id = $name.find('a[data-field].p_author_name').text().trim();

        if (!id) return;

        let icon = $icon[0].cloneNode(true);

        if (GM_listValues().indexOf(id) > -1) return post.remove();

        if ($name.find('svg').length) return;

        $(icon).click(()=> {
          let [bar,reason] = [common.getBarName(), '在帖子中选择'];

          GM_setValue(id, {id, bar, reason, date: new Date()});
          $('.p_postlist .l_post').each(ele=> {
            let username = $(ele).attr('data-field').replace(/\'/g, '"');
            if (!username) return;
            username = JSON.parse(username).author.user_name || JSON.parse(username).author.name_u;
            username = username.replace(/\&ie\=.*$/ig, '');
            username = decodeURI(username);
            if (username === id) ele.remove();
          });
        });

        $name[0].appendChild(icon);

      })
    }
    else if (common.getPosition() === 'list') {
      let interval = setInterval(()=> {
        let postList = $('ul#thread_list li[data-field].j_thread_list');
        if (!postList.length) return;

        clearInterval(interval);
        initCount++;
        postList.each(post=> {
          let $name = $(post).find('.j_threadlist_li_right .tb_icon_author');
          if (!$name[0]) return;

          let id = $name.find('a[data-field].frs-author-name').text().trim();
          let icon = $icon[0].cloneNode(true);

          if (GM_listValues().indexOf(id) > -1) return post.remove();

          $(icon).click(()=> {
            let [bar,reason] = [common.getBarName(), '贴吧首页选择'];
            if (!id) return;
            GM_setValue(id, {id, bar, reason, date: new Date()});

            $('ul#thread_list li[data-field].j_thread_list').each(_post=> {
              let username = $(_post).find('a[data-field].frs-author-name').text().trim();
              if (!username) return;
              if (username === id) _post.remove();
            });

          });

          $name[0].appendChild(icon);

        })
      }, 100);
    }
  };

  init();

  $(document).observe((target, addedNodes = [], removedNodes = [])=> {

    addedNodes = Array.from(addedNodes);

    // if (!addedNodes || !addedNodes.length || removedNodes.length) return;


    addedNodes.forEach((node)=> {
      // 翻页
      if (node.id === 'content_leftList' || node.id === 'j_p_postlist') {
        initCount > 0 && init();
      }
    });

    // 楼中楼翻页
    if (target && $(target).hasClass('j_lzl_m_w')) {

      let $lzlList = $(target).find('li.lzl_single_post');

      $lzlList.each(lzl=> {
        let $lzl = $(lzl);
        if ($lzl.attr('filter')) return;

        $lzl.attr('filter', true);
        let id = JSON.parse($lzl.attr('data-field').replace(/\'/g, '"')).user_name;
        id = decodeURI(id);

        if (!id) return;

        if (GM_listValues().indexOf(id) > -1) return lzl.remove();

        let $name = $lzl.find('.lzl_cnt');

        if ($name.find('svg').length) return;

        let icon = $icon[0].cloneNode(true);

        $(icon).click(e=> {
          let [bar,reason] = [common.getBarName(), '楼中楼选择'];

          GM_setValue(id, {id, bar, reason, date: new Date()});

          $lzlList.each(_lzl=> {
            let username = $(_lzl).find('div.lzl_cnt a.j_user_card').text().trim();
            if (!username) return;
            if (username === id) _lzl.remove();
          });

        });

        $name[0].insertBefore(icon, $name[0].childNodes[0]);
      });
    }

    //
    let $lzlList = $('ul.j_lzl_m_w');
    if (!$lzlList.length) return;

    $lzlList.each(lzls=> {
      if ($(lzls).attr('filter')) return;

      $(lzls).attr('filter', true);

      $(lzls).find('li.lzl_single_post').each(lzl=> {
        let $lzl = $(lzl);
        let $name = $lzl.find('.lzl_cnt');

        if ($name.find('svg').length) return;

        let icon = $icon[0].cloneNode(true);

        let id = JSON.parse($lzl.attr('data-field').replace(/\'/g, '"')).user_name;

        if (GM_listValues().indexOf(id) > -1) return lzl.remove();

        if (!id) return;

        $(icon).click(e=> {
          let [bar,reason] = [common.getBarName(), '楼中楼选择'];
          GM_setValue(id, {id, bar, reason, date: new Date()});
          // 删除当前楼中楼的
          $lzlList.each(_lzl=> {
            let $floor = $(_lzl).find('div.lzl_cnt');
            $floor.each(_post=> {
              let username = $(_post).find('a.j_user_card').text().trim();
              if (!username) return;
              if (username === id) _post.parentElement.remove();
            });
          });
          // 删除帖子里面楼层的
          init();
        });
        $name[0].insertBefore(icon, $name[0].childNodes[0]);
      });
    })

  });

});