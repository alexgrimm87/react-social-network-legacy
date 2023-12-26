import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

import {FilterType, requestUsers, follow, unfollow} from "../../redux/users-reducer";
import {AppDispatch} from "../../redux/redux-store";
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter
} from "../../redux/users-selectors";

import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UserSearchForm from "./UserSearchForm";

type PropsType = {}

type QueryParamsType = {term?: string, page?: string, friend?: string}

export const Users: FC<PropsType> = (props) => {
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const parsed = Object.fromEntries(Array.from(searchParams.entries())) as QueryParamsType;

      let actualPage = currentPage;
      let actualFilter = filter;

      if(!!parsed.page) actualPage = Number(parsed.page)

      if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

      switch(parsed.friend) {
        case "null":
          actualFilter = {...actualFilter, friend: null}
          break;
        case "true":
          actualFilter = {...actualFilter, friend: true}
          break;
        case "false":
          actualFilter = {...actualFilter, friend: false}
          break;
      }

      dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, []);

    useEffect(() => {
      const query: QueryParamsType = {}

      if (!!filter.term) query.term = filter.term
      if (filter.friend !== null) query.friend = String(filter.friend)
      if (currentPage !== 1) query.page = String(currentPage)

      const queryString = Object.keys(query)
        .map(key => {
          const value = query[key as keyof QueryParamsType];

          if (value !== undefined) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          }

          return '';
        })
        .filter(Boolean)
        .join('&');

        navigate(`?${queryString}`);
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
      dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
      dispatch(requestUsers(1, pageSize, filter));
    }

    const followTransit = (userId: number) => {
      dispatch(follow(userId));
    }
    const unfollowTransit = (userId: number) => {
      dispatch(unfollow(userId));
    }

    return <div>
          <UserSearchForm onFilterChanged={onFilterChanged} />
          <Paginator currentPage={currentPage}
                     totalItemsCount={totalUsersCount}
                     pageSize={pageSize}
                     onPageChanged={onPageChanged}
          />
          <div>
              {
                  users.map(u => <User key={u.id}
                                       user={u}
                                       followingInProgress={followingInProgress}
                                       unfollow={unfollowTransit}
                                       follow={followTransit} /> )
              }
          </div>
      </div>
}
