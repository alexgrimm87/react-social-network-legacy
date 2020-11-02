import React from 'react';
import style from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    return (
        <div>
            <div className={style.banner}>
                <img src="https://theinpaint.com/images/example-1-2.jpg" alt=""/>
            </div>
            <div className={style.user}>
                <div className={style.avatar}>
                    <img src="https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg" alt=""/>
                </div>
                <div className={style.description}>
                    Alexander
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;
