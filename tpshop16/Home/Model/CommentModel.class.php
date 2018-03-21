<?php
namespace Home\Model;
use Think\Model\RelationModel;
 class CommentModel extends RelationModel{
     public $_validate = array(
        array('content','6,200','请拿出你的真实水平','1','length','3'),
     );
 }
