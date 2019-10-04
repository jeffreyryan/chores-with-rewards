// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    userName
    email
    phone
    isParent
    chores {
      items {
        id
        title
        desc
      }
      nextToken
    }
    reward {
      items {
        id
        name
        desc
      }
      nextToken
    }
  }
}
`;

export const getUserByName = `query GetUser($userName: userName!) {
  getUser(userName: $userName) {
    id
    userName
    email
    phone
    chores {
      items {
        id
        title
        desc
      }
      nextToken
    }
    reward {
      items {
        id
        name
        desc
      }
      nextToken
    }
  }
}
`;

export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userName
      email
      phone
      isParent
      chores {
        nextToken
      }
      reward {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getReward = `query GetReward($id: ID!) {
  getReward(id: $id) {
    id
    name
    desc
    user {
      id
      userName
      email
      phone
      isParent
      chores {
        nextToken
      }
      reward {
        nextToken
      }
    }
    chores {
      items {
        id
        title
        desc
      }
      nextToken
    }
    rewardDates {
      items {
        id
        targetDate
        completeDate
        completed
        notes
      }
      nextToken
    }
  }
}
`;
export const listRewards = `query ListRewards(
  $filter: ModelRewardFilterInput
  $limit: Int
  $nextToken: String
) {
  listRewards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      desc
      user {
        id
        userName
        email
        phone
        isParent
      }
      chores {
        nextToken
      }
      rewardDates {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getChore = `query GetChore($id: ID!) {
  getChore(id: $id) {
    id
    title
    desc
    user {
      id
      userName
      email
      phone
      isParent
      chores {
        nextToken
      }
      reward {
        nextToken
      }
    }
    reward {
      id
      name
      desc
      user {
        id
        userName
        email
        phone
        isParent
      }
      chores {
        nextToken
      }
      rewardDates {
        nextToken
      }
    }
    ChoreDates {
      items {
        id
        targetDate
        completeDate
        completed
        notes
      }
      nextToken
    }
  }
}
`;
export const listChores = `query ListChores(
  $filter: ModelChoreFilterInput
  $limit: Int
  $nextToken: String
) {
  listChores(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      desc
      user {
        id
        userName
        email
        phone
        isParent
      }
      reward {
        id
        name
        desc
      }
      ChoreDates {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getChoreDate = `query GetChoreDate($id: ID!) {
  getChoreDate(id: $id) {
    id
    targetDate
    completeDate
    completed
    notes
    chore {
      id
      title
      desc
      user {
        id
        userName
        email
        phone
        isParent
      }
      reward {
        id
        name
        desc
      }
      ChoreDates {
        nextToken
      }
    }
  }
}
`;
export const listChoreDates = `query ListChoreDates(
  $filter: ModelChoreDateFilterInput
  $limit: Int
  $nextToken: String
) {
  listChoreDates(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      targetDate
      completeDate
      completed
      notes
      chore {
        id
        title
        desc
      }
    }
    nextToken
  }
}
`;
export const getRewardDate = `query GetRewardDate($id: ID!) {
  getRewardDate(id: $id) {
    id
    targetDate
    completeDate
    completed
    notes
    reward {
      id
      name
      desc
      user {
        id
        userName
        email
        phone
        isParent
      }
      chores {
        nextToken
      }
      rewardDates {
        nextToken
      }
    }
  }
}
`;
export const listRewardDates = `query ListRewardDates(
  $filter: ModelRewardDateFilterInput
  $limit: Int
  $nextToken: String
) {
  listRewardDates(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      targetDate
      completeDate
      completed
      notes
      reward {
        id
        name
        desc
      }
    }
    nextToken
  }
}
`;
