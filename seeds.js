var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Tabarka",
    image:
      "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae possimus iusto sed qui reprehenderit pariatur? Consectetur excepturi eligendi recusandae perferendis mollitia enim consequuntur quasi accusamus ad sit eos iste iusto doloribus tempora, obcaecati porro consequatur placeat eaque delectus odio voluptas nisi aliquid a hic? Accusantium itaque tenetur dicta facere aliquam asperiores quisquam ut repellendus laudantium quidem, deleniti alias illo tempora error optio iste ducimus dolor nihil voluptatum, porro repudiandae vel."
  },
  {
    name: "Ain Draham",
    image:
      "https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae possimus iusto sed qui reprehenderit pariatur? Consectetur excepturi eligendi recusandae perferendis mollitia enim consequuntur quasi accusamus ad sit eos iste iusto doloribus tempora, obcaecati porro consequatur placeat eaque delectus odio voluptas nisi aliquid a hic? Accusantium itaque tenetur dicta facere aliquam asperiores quisquam ut repellendus laudantium quidem, deleniti alias illo tempora error optio iste ducimus dolor nihil voluptatum, porro repudiandae vel. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae possimus iusto sed qui reprehenderit pariatur? Consectetur excepturi eligendi recusandae perferendis mollitia enim consequuntur quasi accusamus ad sit eos iste iusto doloribus tempora, obcaecati porro consequatur placeat eaque delectus odio voluptas nisi aliquid a hic? Accusantium itaque tenetur dicta facere aliquam asperiores quisquam ut repellendus laudantium quidem, deleniti alias illo tempora error optio iste ducimus dolor nihil voluptatum, porro repudiandae vel. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae possimus iusto sed qui reprehenderit pariatur? Consectetur excepturi eligendi recusandae perferendis mollitia enim consequuntur quasi accusamus ad sit eos iste iusto doloribus tempora, obcaecati porro consequatur placeat eaque delectus odio voluptas nisi aliquid a hic? Accusantium itaque tenetur dicta facere aliquam asperiores quisquam ut repellendus laudantium quidem, deleniti alias illo tempora error optio iste ducimus dolor nihil voluptatum, porro repudiandae vel."
  },
  {
    name: "Hammamet",
    image:
      "https://images.unsplash.com/photo-1519146580282-da3330eaedbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae possimus iusto sed qui reprehenderit pariatur? Consectetur excepturi eligendi recusandae perferendis mollitia enim consequuntur quasi accusamus ad sit eos iste iusto doloribus tempora, obcaecati porro consequatur placeat eaque delectus odio voluptas nisi aliquid a hic? Accusantium itaque tenetur dicta facere aliquam asperiores quisquam ut repellendus laudantium quidem, deleniti alias illo tempora error optio iste ducimus dolor nihil voluptatum, porro repudiandae vel. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae possimus iusto sed qui reprehenderit pariatur? Consectetur excepturi eligendi recusandae perferendis mollitia enim consequuntur quasi accusamus ad sit eos iste iusto doloribus tempora, obcaecati porro consequatur placeat eaque delectus odio voluptas nisi aliquid a hic? Accusantium itaque tenetur dicta facere aliquam asperiores quisquam ut repellendus laudantium quidem, deleniti alias illo tempora error optio iste ducimus dolor nihil voluptatum, porro repudiandae vel.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae possimus iusto sed qui reprehenderit pariatur? Consectetur excepturi eligendi recusandae perferendis mollitia enim consequuntur quasi accusamus ad sit eos iste iusto doloribus tempora, obcaecati porro consequatur placeat eaque delectus odio voluptas nisi aliquid a hic? Accusantium itaque tenetur dicta facere aliquam asperiores quisquam ut repellendus laudantium quidem, deleniti alias illo tempora error optio iste ducimus dolor nihil voluptatum, porro repudiandae vel."
  },
  {
    name: "Tozeur",
    image:
      "https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae possimus iusto sed qui reprehenderit pariatur? Consectetur excepturi eligendi recusandae perferendis mollitia enim consequuntur quasi accusamus ad sit eos iste iusto doloribus tempora, obcaecati porro consequatur placeat eaque delectus odio voluptas nisi aliquid a hic? Accusantium itaque tenetur dicta facere aliquam asperiores quisquam ut repellendus laudantium quidem, deleniti alias illo tempora error optio iste ducimus dolor nihil voluptatum, porro repudiandae vel. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae possimus iusto sed qui reprehenderit pariatur? Consectetur excepturi eligendi recusandae perferendis mollitia enim consequuntur quasi accusamus ad sit eos iste iusto doloribus tempora, obcaecati porro consequatur placeat eaque delectus odio voluptas nisi aliquid a hic? Accusantium itaque tenetur dicta facere aliquam asperiores quisquam ut repellendus laudantium quidem, deleniti alias illo tempora error optio iste ducimus dolor nihil voluptatum, porro repudiandae vel."
  }
];

function seedDB() {
  // remvoe all campgrounds
  Comment.deleteMany({});
  Campground.deleteMany({}, function(err) {
    if (err) {
      console.log("Error" + err);
    }
    console.log("removed campgrounds!");
    // add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added new data");
          Comment.deleteMany({}, function(err) {
            if (err) {
              console.log(err);
            } else {
              Comment.create(
                {
                  text:
                    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias ea ipsa officiis, aspernatur repellat assumenda voluptatibus eum. Perferendis, obcaecati at!",
                  author: "Jhon Doe"
                },
                function(err, comment) {
                  if (err) {
                    console.log(err);
                  } else {
                    campground.comments.push(comment);
                    campground.save();
                    console.log("created comment");
                  }
                }
              );
            }
          });
        }
      });
    });
  });
}

module.exports = seedDB;
