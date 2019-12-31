// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createReward = `mutation CreateReward($input: CreateRewardInput!) {
  createReward(input: $input) {
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
export const updateReward = `mutation UpdateReward($input: UpdateRewardInput!) {
  updateReward(input: $input) {
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
export const deleteReward = `mutation DeleteReward($input: DeleteRewardInput!) {
  deleteReward(input: $input) {
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
export const createChore = `mutation CreateChore($input: CreateChoreInput!) {
  createChore(input: $input) {
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
        rewardDate
        notes
      }
      nextToken
    }
  }
}
`;
export const updateChore = `mutation UpdateChore($input: UpdateChoreInput!) {
  updateChore(input: $input) {
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
        rewardDate
        notes
      }
      nextToken
    }
  }
}
`;
export const deleteChore = `mutation DeleteChore($input: DeleteChoreInput!) {
  deleteChore(input: $input) {
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
        rewardDate
        notes
      }
      nextToken
    }
  }
}
`;
export const createChoreDate = `mutation CreateChoreDate($input: CreateChoreDateInput!) {
  createChoreDate(input: $input) {
    id
    targetDate
    completeDate
    completed
    rewardDate
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
export const updateChoreDate = `mutation UpdateChoreDate($input: UpdateChoreDateInput!) {
  updateChoreDate(input: $input) {
    id
    targetDate
    completeDate
    completed
    rewardDate
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
export const deleteChoreDate = `mutation DeleteChoreDate($input: DeleteChoreDateInput!) {
  deleteChoreDate(input: $input) {
    id
    targetDate
    completeDate
    completed
    rewardDate
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
export const createRewardDate = `mutation CreateRewardDate($input: CreateRewardDateInput!) {
  createRewardDate(input: $input) {
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
export const updateRewardDate = `mutation UpdateRewardDate($input: UpdateRewardDateInput!) {
  updateRewardDate(input: $input) {
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
export const deleteRewardDate = `mutation DeleteRewardDate($input: DeleteRewardDateInput!) {
  deleteRewardDate(input: $input) {
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
