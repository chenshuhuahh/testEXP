<?php
namespace Admin\Model;
use Think\Model\RelationModel;

class GoodsModel extends RelationModel{
    public $_link = array(
        'comment' => self::HAS_MANY,
    );
    public $insertFields = 'goods_name,goods_sn';

    public $_auto = array(
        // array(完成字段1,完成规则,[完成条件,附加规则]),
        array('add_time','time',3,'function'),
    );
    public $_validate = array(
        // array(验证字段1,验证规则,错误提示,[验证条件,附加规则,验证时间]),
        array('goods_name','3,12','你这个傻子，名字不对','1','length','3'),
        array('goods_sn','','你这个傻子，货号不对','1','unique','3'),
        array('shop_price','pr','shop_price错了','1','callback','3'),
    );
    public function pr(){
        return true;
    }
}
