// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateReward = `subscription OnCreateReward {
  onCreateReward {
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
export const onUpdateReward = `subscription OnUpdateReward {
  onUpdateReward {
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
export const onDeleteReward = `subscription OnDeleteReward {
  onDeleteReward {
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
export const onCreateChore = `subscription OnCreateChore {
  onCreateChore {
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
export const onUpdateChore = `subscription OnUpdateChore {
  onUpdateChore {
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
export const onDeleteChore = `subscription OnDeleteChore {
  onDeleteChore {
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
export const onCreateChoreDate = `subscription OnCreateChoreDate {
  onCreateChoreDate {
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
export const onUpdateChoreDate = `subscription OnUpdateChoreDate {
  onUpdateChoreDate {
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
export const onDeleteChoreDate = `subscription OnDeleteChoreDate {
  onDeleteChoreDate {
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
export const onCreateRewardDate = `subscription OnCreateRewardDate {
  onCreateRewardDate {
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
export const onUpdateRewardDate = `subscription OnUpdateRewardDate {
  onUpdateRewardDate {
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
export const onDeleteRewardDate = `subscription OnDeleteRewardDate {
  onDeleteRewardDate {
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
