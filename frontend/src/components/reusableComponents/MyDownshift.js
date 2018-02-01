import React from "react";
import Downshift from "downshift";

import { Redirect, Link } from "react-router-dom";

// CARD
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

const styles = {
  card: {
    maxWidth: "90%"
  },
  media: {
    height: 200
  }
};

class MyDownshift extends React.Component {
  componentDidMount() {
    this.props.filterPosts();
  }

  render() {
    const { posts } = this.props.posts_filtered;
    const { classes } = this.props;
    return (
      <Downshift
        onChange={selection => {
          console.log(`You selected ${selection.title}`);
        }}
        itemToString={i => (i == null ? "" : String(i.title))}
        onOuterClick={() => this.setState({ menuIsOpen: false })}
        render={({
          getInputProps,
          getItemProps,
          getLabelProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <label {...getLabelProps()}>Filter for a post</label>
            <input {...getInputProps()} />
            {isOpen ? (
              <div className="row">
                {posts
                  .filter(
                    i =>
                      !inputValue ||
                      i.category
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()) ||
                      i.title.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .slice(0, 10)
                  .map((item, index) => (
                    <div
                      {...getItemProps({
                        key: item.id,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                      className="col-sm-4"
                    >
                      {" "}
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.media}
                          image={item.image_home_page}
                          title={item.title}
                        />
                        <CardContent>
                          <Typography type="headline" component="h2">
                            <Link to={`/${item.slug}`}>{item.title}</Link>
                          </Typography>
                          <Typography component="p">
                            {item.content_home_page}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        )}
      />
    );
  }
}

export default withStyles(styles)(MyDownshift);
