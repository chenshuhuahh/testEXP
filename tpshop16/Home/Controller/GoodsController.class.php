<?php
namespace Home\Controller;
use Think\Controller;
class GoodsController extends Controller {

    public function comment(){

        if(IS_POST){
            $_POST['pubtime'] = time();
            $commentModel = D('comment');
            $con = $_POST['content'];
            unset($_POST['content']);
            if(!$commentModel->create()){
                echo $commentModel->getError();
                exit;
            }
            $commentModel->content = $con;
            if($commentModel->add()){
                $this->success('评论成功，你真棒啊……','','2');
            }else {
                $this->error('评论失败，你真挫啊……','','2');
            }
        }

    }

    public function goods(){
        $goods = D('Admin/goods');
        $goodsinfo = $goods->find(I('goods_id'));
        if($goodsinfo){
            $his = $this->his($goodsinfo);
        }
        $commentinfo = $goods->relationGet('comment');
        $commentinfo['content'] = htmlspecialchars($commentinfo['content']);
        // $commentinfo = D('comment')->where(array('goods_id'=>I('goods_id')))->select();
        $this->assign('mbx',$this->mbx($goodsinfo['cat_id']));
        $this->assign('comment',$commentinfo);
        $this->assign('goodsinfo',$goodsinfo);
        $this->display();
    }
    //历史
    public function his($goodsinfo){
        $goods_name = $goodsinfo['goods_name'];
        $shop_price = $goodsinfo['shop_price'];
        $goods_id = $goodsinfo['goods_id'];
        // $his = array();
        $his = session('?his')?session('his'):array();
        if(count($his) > 3){
            $k = key($his);
            unset($his[$k]);
        }
        $his[$goods_id] = array(
            'goods_name' =>$goods_name,
            'shop_price' =>$shop_price,
        );

        session('his',$his);
    }

    //添加购物车
    public function gwc(){
        $goodsinfo = D('Admin/Goods')->find(I('get.goods_id'));
        $tool = \Home\Tool\AddTool::getIns();
        $tool->add($goodsinfo['goods_id'],$goodsinfo['goods_name'],$goodsinfo['shop_price']);
        var_dump(session('kache'));

    }

    public function mbx($cat_id){
        $catModel = D("Admin/Cat");
        $fm = array();
        while($cat_id > 0){
            foreach ($catModel->select() as $k => $v) {
                if($cat_id == $v['cat_id']){
                    $fm[] = $v;
                    $cat_id = $v['parent_id'];
                    break;
                }
            }
        }
        return array_reverse($fm);
    }

}
