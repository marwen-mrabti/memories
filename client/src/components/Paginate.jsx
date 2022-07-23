import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { GetAllPosts } from '../redux/actions/post.actions';
import { useDispatch, useSelector } from 'react-redux';

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { numberOfPages } = useSelector((state) => state.posts);
  useEffect(() => {
    page && dispatch(GetAllPosts(page));
  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
