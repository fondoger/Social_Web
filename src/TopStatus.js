import React, { Component } from "react";
import {
  UserCard,
  StatusItem,
  WriteStatusCard
} from "./components";
import {
  List, message, Avatar, Spin, Skeleton
} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { Affix, Calendar } from 'antd';
import API from './utils/API_v1';
import "./TopStatus.css";


export default class TopStatus extends Component {
  state = {
    type: 'status',
  }

  render() {
    return(
      <div className="TopStatus">
        <div className="TopStatus-container">
          <div className="GlobalSideBar TopStatus-leftColumn">
            <Affix offsetTop={60}>
              <StatusCategories />
              <DividingLine />
              <FriendLinks />
              <YellowPages />
            </Affix>
          </div>
          <div className="TopStatus-mainColumn">
            <WriteStatusCard receiveNewStatus={this.handleNewStatus}/>
            <StatusList addListener={this.addListener} type={this.state.type}/>
          </div>
          <div className="GlobalSideBar TopStatus-rightColumn">
            <UserCard />
            <Affix offsetTop={60}><CalendarCard /></Affix>
          </div>
        </div>
      </div>
    );
  }
  addListener = (t) => {
    this.receiveNewStatus = t;
  }
  handleNewStatus = (status) => {
    this.receiveNewStatus(status);
  }
}

class StatusList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      statuses: [],
      hasMore: true,
      loading: false,
    }
  }
  refresh() {
    console.log("refresh");
    this.setState({loading: true});
    API.Status.get({
      type: this.state.type, 
      offset: 0, 
      limit: 10,
    }, (responseJson) => {
      const hasMore = responseJson.length != 0;
      this.setState({statuses: responseJson, hasMore, loading: false});
      console.log(responseJson);
    }, (error) => {
      console.log(error);
      message.error("加载失败");
      this.setState({loading: false});
    });
  }
  componentDidMount() {
    this.refresh();
    this.props.addListener(status => {
      this.state.statuses.unshift(status);
      this.setState({statuses: this.state.statuses});
    });
  }
  handleLoadMore = () => {
    this.setState({loading: true});
    API.Status.get({
      type: this.state.type,
      offset: this.state.statuses.length,
      limit: 10,
    }, (responseJson) => {
      const hasMore = responseJson.length != 0;
      const statuses = [...this.state.statuses, ...responseJson];
      this.setState({statuses, hasMore, loading: false, loading: false});
    }, error => {
      console.log(error);
      message.error("加载失败");
      this.setState({loading: false});
    });
  }
  render() {
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={this.handleLoadMore}
        hasMore={!this.state.loading && this.state.hasMore}
        useWindow={true}
      >
        {
          this.state.statuses.map((item, idx) => (
            <StatusItem key={item.type + item.id} status={item} onDelete={()=>this.handleDeleteStatus(idx)} />
          ))
        }
        {
          this.state.loading ?
          <div style={{background: '#fff', padding: 16}}>
            <Skeleton 
              title={true} 
              active 
              avatar={{size: 'large'}} 
              paragraph={{rows: 4, }}/>  
          </div> : null
        }
      </InfiniteScroll>
    );
  }
  
  handleDeleteStatus = (index) => {
    const statuses = this.state.statuses;
    statuses.splice(index, 1);
    this.setState({statuses});
  }
}

const CalendarCard = () => (
  <div className="Card">
    <Calendar fullscreen={false} />
  </div>
);

const LeftRow = ({href, children}) => (
  <a href={href} className="TopStatus-leftColumn-row">
    { children }
  </a>
);

const DividingLine = () => (
  <div className="dividing-line">
    <fieldset></fieldset>
  </div>
);

const Dot = () => (
  <span className="dot">
  </span>
);

const StatusCategories = () => (
  <div>
    <LeftRow href="#">
      <span className="boldItem">首页</span>
    </LeftRow>
    <LeftRow href="#">
      <span className="boldItem">今日热点</span>
    </LeftRow>
    <LeftRow href="#">
      <span className="boldItem">我的收藏</span>
    </LeftRow>
  </div>
);

const FriendLinks = () => (
  <div>
    <LeftRow href="//buaabt.cn">
      <Dot />
      <span>未来花园论坛</span>
    </LeftRow>
    <LeftRow href="//i.buaa.edu.cn">
      <Dot />
      <span>ihome社区</span>
    </LeftRow>
  </div>
);

const YellowPages = () => (
  <div>
    <LeftRow herf="#">
      <Dot />
      <span>北航黄页</span>
    </LeftRow>
  </div>
);
