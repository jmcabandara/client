// @flow
import * as React from 'react'
import * as Types from '../../../../constants/types/chat2'
import {Markdown} from '../../../../common-adapters'
import {globalStyles, globalColors, isMobile} from '../../../../styles'

export type Props = {
  text: string,
  type: 'error' | 'pending' | 'sent',
  isEditing: boolean,
  mentionsAt: Types.MentionsAt,
  mentionsChannel: Types.MentionsChannel,
  mentionsChannelName: Types.MentionsChannelName,
}

const MessageText = ({text, type, isEditing, mentionsAt, mentionsChannel, mentionsChannelName}: Props) => (
  <Markdown
    style={getStyle(type, isEditing)}
    meta={{mentionsAt, mentionsChannel, mentionsChannelName}}
    allowFontScaling={true}
  >
    {text}
  </Markdown>
)

// Encoding all 4 states as static objects so we don't re-render
const getStyle = (type, isEditing) => {
  if (type === 'sent') {
    return isEditing ? sentEditingStyle : sentStyle
  } else {
    return isEditing ? pendingFailEditingStyle : pendingFailStyle
  }
}

const editingStyle = {
  borderColor: globalColors.blue,
  borderRadius: 4,
  borderStyle: isMobile ? 'solid' : 'dashed',
  borderWidth: 1,
  paddingLeft: 2,
  paddingRight: 2,
}

const sentStyle = {
  ...globalStyles.selectable,
  width: '100%',
  ...(isMobile
    ? {
        color: globalColors.black_75,
      }
    : {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }),
}

const sentEditingStyle = {
  ...sentStyle,
  ...editingStyle,
}

const pendingFailStyle = {
  ...sentStyle,
  color: globalColors.black_40,
}

const pendingFailEditingStyle = {
  ...pendingFailStyle,
  ...editingStyle,
}

export default MessageText
