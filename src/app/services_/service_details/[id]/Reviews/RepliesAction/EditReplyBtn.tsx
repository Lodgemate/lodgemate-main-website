import { Endpoints } from '@/services/Api/endpoints'
import { FetchApi } from '@/utils/Fetchdata'
import React, { useState } from 'react'
import ReviewComments from '../Modals/ReplyComment'
import EditRepliesModal from '../Modals/EditRepliesModal'
import { IoPencil } from 'react-icons/io5'

interface DeleteReviewbtProps{
  LodgeDataId?: string | number
  ReviewData?: string | number
  ReplyDataId?: string | number
}

const EditReplyBtn :React.FC<DeleteReviewbtProps> = ({LodgeDataId,ReviewData,ReplyDataId}) => {
 const [writereply, setwritereply] = useState(false)

  return (
      <button onClick={()=>setwritereply(true)}>
       <EditRepliesModal
          show={writereply}
          onClose={() => setwritereply(false)}
          LodgeDataId={LodgeDataId}
          ReviewData = {ReviewData}
          ReplyDataId={ReplyDataId} 
        />
       <IoPencil/>
      </button>
  )
}

export default EditReplyBtn